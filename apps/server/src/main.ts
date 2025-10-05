import cors from '@fastify/cors';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
// Load environment variables from .env file
import { config } from 'dotenv';
import Fastify from 'fastify';
import { resolve } from 'path';
import { env } from './env';
import { trpcRouter } from '@codoing/trpc-server';
import { registerRoutes } from './routes';

config({ path: resolve(process.cwd(), '.env') });

async function main() {
  // Create Fastify instance with pretty logging in development
  const server = Fastify({
    logger: env.NODE_ENV === 'development' ? {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
          messageFormat: '{msg}',
          levelFirst: true
        }
      },
      level: 'info'
    } : {
      level: 'info'
    },
  });

  // Register CORS
  await server.register(cors, {
    origin: env.NODE_ENV === 'development' ? env.WEB_URL : false,
    credentials: true,
  });

  // Register all routes (auth, health, etc.)
  await server.register(registerRoutes);

  // Register tRPC plugin
  await server.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: trpcRouter },
  });

  // Start server
  try {
    await server.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });

    server.log.info(`🚀 Server running at http://localhost:${env.PORT}`);
    server.log.info(`📡 tRPC endpoint: http://localhost:${env.PORT}/trpc`);
    server.log.info(`🔐 Auth endpoints: http://localhost:${env.PORT}/api/auth/*`);
    server.log.info(`🏥 Health check: http://localhost:${env.PORT}/health`);
    server.log.info(`🌍 Environment: ${env.NODE_ENV}`);
  } catch (err) {
    server.log.error({ err }, 'Failed to start server');
    process.exit(1);
  }
}

main().catch(console.error);
