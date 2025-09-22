import { ClerkProvider } from "@clerk/clerk-react";
import { HeroUIProvider } from "@heroui/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { JazzInspector } from "jazz-tools/inspector";
import { JazzReactProvider } from "jazz-tools/react";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { TodoAccount } from "./schema";
import "./styles.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <HeroUIProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <JazzReactProvider
          AccountSchema={TodoAccount}
          sync={{ peer: "ws://localhost:4200" }}
          auth="guest"
        >
          <RouterProvider router={router} />
          <JazzInspector />
        </JazzReactProvider>
      </ClerkProvider>
    </HeroUIProvider>
  </StrictMode>,
);
