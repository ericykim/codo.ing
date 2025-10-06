import type { TRPCContext } from "@codoing/trpc-server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { Auth } from "better-auth";
import { fromNodeHeaders } from "better-auth/node";

// Direct context creation function that handles auth and can be extended for more context
export async function createContext(
  { req }: CreateFastifyContextOptions,
  auth: Auth,
): Promise<TRPCContext> {
  try {
    // Convert Fastify request headers to Headers object using Better-auth helper
    const headers = fromNodeHeaders(req.headers);

    // Use Better-auth's getSession API directly - it handles all cookie parsing and validation
    const sessionData = await auth.api.getSession({ headers });

    if (!sessionData?.user || !sessionData?.session) {
      return { user: null, session: null };
    }

    // Future context additions can be added here (db connections, etc.)
    return {
      user: {
        id: sessionData.user.id,
        email: sessionData.user.email,
        name: sessionData.user.name || undefined,
        image: sessionData.user.image || undefined,
      },
      session: {
        id: sessionData.session.id,
        userId: sessionData.session.userId,
        expiresAt: new Date(sessionData.session.expiresAt),
      },
    };
  } catch (error) {
    // If session validation fails, return unauthenticated context
    console.error("Session validation error:", error);
    return { user: null, session: null };
  }
}
