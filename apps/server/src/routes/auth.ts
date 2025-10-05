import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { auth } from "../auth";

// Validation schemas
const signUpEmailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.string().url().optional(),
  callbackURL: z.string().url().optional(),
});

const signInEmailSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(1, "Password is required"),
  callbackURL: z.string().url().optional(),
  rememberMe: z.boolean().optional(),
});

/**
 * Better-auth route plugin for Fastify
 * Uses direct auth.api.* methods for better control
 */
export async function authRoutes(fastify: FastifyInstance) {
  // Email sign-up endpoint
  fastify.post(
    "/auth/sign-up/email",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const validatedBody = signUpEmailSchema.parse(request.body);

        const data = await auth.api.signUpEmail({
          body: {
            name: validatedBody.name,
            email: validatedBody.email,
            password: validatedBody.password,
            image: validatedBody.image,
            callbackURL: validatedBody.callbackURL,
          },
        });

        return reply.status(200).send(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: "Validation failed",
            details: error.issues,
          });
        }
        fastify.log.error({ error }, "Sign-up error");
        return reply.status(400).send({
          error: "Sign-up failed",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
  );

  // Email sign-in endpoint
  fastify.post(
    "/auth/sign-in/email",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const validatedBody = signInEmailSchema.parse(request.body);

        const data = await auth.api.signInEmail({
          body: {
            email: validatedBody.email,
            password: validatedBody.password,
            callbackURL: validatedBody.callbackURL,
            rememberMe: validatedBody.rememberMe ?? true,
          },
        });

        return reply.status(200).send(data);
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: "Validation failed",
            details: error.issues,
          });
        }
        fastify.log.error({ error }, "Sign-in error");
        return reply.status(400).send({
          error: "Sign-in failed",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
  );

  // Sign-out endpoint
  fastify.post(
    "/auth/sign-out",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const data = await auth.api.signOut({
          headers: request.headers as Record<string, string>,
        });

        return reply.status(200).send(data);
      } catch (error) {
        fastify.log.error({ error }, "Sign-out error");
        return reply.status(400).send({
          error: "Sign-out failed",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
  );

  // Session endpoint (get current session)
  fastify.get(
    "/auth/session",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const session = await auth.api.getSession({
          headers: request.headers as Record<string, string>,
        });

        return reply.status(200).send(session);
      } catch (error) {
        fastify.log.error({ error }, "Session error");
        return reply.status(401).send({
          error: "Session not found",
          details: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
  );
}
