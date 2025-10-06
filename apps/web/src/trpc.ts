import type { TRPCRouter } from "@codoing/trpc-server";
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact, type CreateTRPCReact } from "@trpc/react-query";
import { env } from "./env";

// Create tRPC React hooks with explicit type annotation
export const trpc: CreateTRPCReact<TRPCRouter, unknown> =
  createTRPCReact<TRPCRouter>();

// Create tRPC client with explicit type annotation
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: `${env.VITE_API_URL}/trpc`,
      // Enable credentials to include cookies in cross-origin requests
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include", // This ensures cookies are sent
        });
      },
    }),
  ],
});
