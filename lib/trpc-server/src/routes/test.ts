import { z } from 'zod';
import { router, publicProcedure, privateProcedure } from '../trpc';

export const testRouter = router({
  // Public endpoint - no authentication required
  publicHello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name}! This is a public endpoint.`,
      };
    }),

  // Private endpoint - authentication required  
  hello: privateProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input, ctx }) => {
      return {
        greeting: `Hello ${input.name}! Welcome back, ${ctx.user.email}!`,
        user: ctx.user,
        sessionId: ctx.session.id,
      };
    }),

  // Private user info endpoint
  me: privateProcedure
    .query(({ ctx }) => {
      return {
        user: ctx.user,
        session: {
          id: ctx.session.id,
          expiresAt: ctx.session.expiresAt,
        },
      };
    }),
});