// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import * as axios from "axios";

const queryClient = new QueryClient();

// Create a new app instance
const app = createRouter({
  routeTree,
  context: {
    queryClient,
  },
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

export default function App() {
  const auth = useAuth();
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const token = await auth.getToken();
      if (token) {
        axios.default.defaults.headers.Authorization = `Bearer ${token}`;
        axios.default.defaults.baseURL = import.meta.env.VITE_API_DDCLINIC;
        setToken(token);
      }
    })();
  }, [auth]);
  if (!token) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={app} />
    </QueryClientProvider>
  );
}
