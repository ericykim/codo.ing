import { testRouter } from "./routes/test";
import { router } from "./trpc";

// Merge all routers
export const trpcRouter = router({
  test: testRouter,
});

export type TRPCRouter = typeof trpcRouter;

// Re-export tRPC utilities
export { publicProcedure, router } from "./trpc";
