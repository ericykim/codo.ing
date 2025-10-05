import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
// Load environment variables from .env file
import { config } from 'dotenv';
import Fastify from 'fastify';
import { resolve } from 'path';
import { env } from './lib/env';
import { trpcRouter } from '@codoing/trpc-server';

config({ path: resolve(process.cwd(), '.env') });

async function main() {
  // Create Fastify instance
  const server = Fastify({
    logger: env.NODE_ENV === 'development',
  });

  // Register CORS
  await server.register(cors, {
    origin: env.NODE_ENV === 'development' ? 'http://localhost:4200' : false,
    credentials: true,
  });

  // Register tRPC plugin
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: trpcRouter },
  });

  // Health check endpoint
  server.get('/health', async () => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  });

  // Start server
  try {
    await server.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });

    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
    console.log(`📡 tRPC endpoint: http://localhost:${env.PORT}/trpc`);
    console.log(`🏥 Health check: http://localhost:${env.PORT}/health`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main().catch(console.error);
