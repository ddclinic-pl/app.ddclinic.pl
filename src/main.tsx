import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pl";
import { ModalsProvider } from "@mantine/modals";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { queryClient } from "./queryClient.ts";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const theme = createTheme({
  colors: {
    gold: [
      "#fcf6e8",
      "#f1eadb",
      "#dfd3bb",
      "#ccba98",
      "#bca579",
      "#b29866",
      "#ae915a",
      "#987e4a",
      "#886f3f",
      "#766031",
    ],
  },
  primaryColor: "gold",
});

// Create a new app instance
const app = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultStaleTime: 5000,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the app instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof app;
  }
}

// Extend the window object to include Clerk session token retrieval
declare global {
  interface Window {
    Clerk: {
      session: {
        getToken: ({ template }: { template: string }) => Promise<string>;
      };
    };
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <QueryClientProvider client={queryClient}>
          <ColorSchemeScript defaultColorScheme="auto" />
          <MantineProvider theme={theme} defaultColorScheme="auto">
            <DatesProvider settings={{ locale: "pl" }}>
              <ModalsProvider>
                <RouterProvider router={app} />
              </ModalsProvider>
              <Notifications />
            </DatesProvider>
          </MantineProvider>
        </QueryClientProvider>
      </SignedIn>
    </ClerkProvider>
  </StrictMode>,
);
