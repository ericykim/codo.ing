import { FastifyInstance } from "fastify";
import { apiRoutes } from "./api";
import { authRoutes } from "./auth";

/**
 * Register all route modules
 */
export async function registerRoutes(fastify: FastifyInstance) {
  // Register versioned API routes under /api/v1
  await fastify.register(async function (fastify) {
    // Register authentication routes
    await fastify.register(authRoutes);
    
    // Register general API routes
    await fastify.register(apiRoutes);
  }, { prefix: '/api/v1' });

  // Health check endpoint (no version prefix)
  fastify.get("/health", async (request, reply) => {
    fastify.log.info("Health check requested");
    return { status: "ok", timestamp: new Date().toISOString() };
  });
}
