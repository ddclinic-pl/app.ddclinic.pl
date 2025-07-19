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
import App from "./App.tsx";
import { Notifications } from "@mantine/notifications";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pl";

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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        <ColorSchemeScript defaultColorScheme="auto" />
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <DatesProvider settings={{ locale: "pl" }}>
            <App />
            <Notifications />
          </DatesProvider>
        </MantineProvider>
      </SignedIn>
    </ClerkProvider>
  </StrictMode>,
);
