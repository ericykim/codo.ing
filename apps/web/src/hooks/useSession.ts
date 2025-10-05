import { authClient } from "../lib/auth";

export const useSession = (): ReturnType<typeof authClient.useSession> => {
  return authClient.useSession();
};
