import { db } from "@codoing/schema/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { env } from "./env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),

  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,

  // Explicitly set supported features
  trustedOrigins: [env.WEB_URL],

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false, // Set to true in production
  },

  // Social providers
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      // Additional Google-specific options
      accessType: "offline", // Always get refresh token
      prompt: "select_account", // Allow users to select account
    },
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },

  // Advanced configuration
  advanced: {
    generateId: () => crypto.randomUUID(), // Use standard UUID v4
  },

  // CORS configuration for web client
  cors: {
    origin: env.WEB_URL,
    credentials: true,
  },

  // Base path for auth routes
  basePath: "/api/v1/auth",
});

export type Session = typeof auth.$Infer.Session;
