import { FastifyInstance } from "fastify";

/**
 * General API routes
 * Add your custom API endpoints here
 */
export async function apiRoutes(fastify: FastifyInstance) {
  // Example: Custom API endpoint
  fastify.get("/api/status", async (request, reply) => {
    return {
      status: "operational",
      timestamp: new Date().toISOString(),
      version: "1.0.0",
    };
  });
}
