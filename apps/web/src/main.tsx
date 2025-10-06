import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRouter,
  RouterProvider,
  createHashHistory,
  createBrowserHistory,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { trpc, trpcClient } from "./trpc";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Detect if running in Electron
const isElectron = !!(typeof window !== "undefined" && window.electron);

// Use hash routing for Electron, browser routing for web
const router = createRouter({
  routeTree,
  history: isElectron ? createHashHistory() : createBrowserHistory(),
});

// Create Query Client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider className="h-full w-full">
          <RouterProvider router={router} />
        </HeroUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);
