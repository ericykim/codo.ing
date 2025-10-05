import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { trpc, trpcClient } from "./trpc";
import { routeTree } from "./routeTree.gen";
import "./styles.css";
import "./router.d.ts";

const router = createRouter({
  routeTree,
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
        <HeroUIProvider>
          <RouterProvider router={router} />
        </HeroUIProvider>
      </QueryClientProvider>
    </trpc.Provider>
  </StrictMode>,
);
