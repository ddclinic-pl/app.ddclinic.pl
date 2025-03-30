import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, createTheme, MantineProvider } from "@mantine/core";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const theme = createTheme({
  primaryColor: "gray",
});

const queryClient = new QueryClient();

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
            <App />
          </MantineProvider>
        </QueryClientProvider>
      </SignedIn>
    </ClerkProvider>
  </StrictMode>,
);
