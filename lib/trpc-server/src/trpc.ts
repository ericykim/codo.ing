import { initTRPC, TRPCError } from "@trpc/server";

// Generic context interface that can be extended by consumers
export interface TRPCContext {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  } | null;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  } | null;
}

// Initialize tRPC with base context
const t = initTRPC.context<TRPCContext>().create();

// Create authentication middleware
const isAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.user || !ctx.session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      session: ctx.session,
    },
  });
});

// Export reusable router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthenticated);
