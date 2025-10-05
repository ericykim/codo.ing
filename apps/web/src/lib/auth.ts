import { createAuthClient } from "better-auth/react";
import { env } from "../env";

export const authClient = createAuthClient({
  baseURL: env.VITE_API_URL,
  basePath: "/api/v1/auth", // Match your server basePath
}) as ReturnType<typeof createAuthClient>;
