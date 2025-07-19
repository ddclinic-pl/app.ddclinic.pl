import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
} from "@tanstack/react-router";
import { useDisclosure } from "@mantine/hooks";
import { AppShell } from "@mantine/core";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { NotFoundScreen } from "../components/NotFoundScreen.tsx";
import { AppHeader } from "../components/AppHeader.tsx";
import { AppNavigation } from "../components/AppNavigation.tsx";
import { ErrorScreen } from "../components/ErrorScreen.tsx";
import { ReactNode } from "react";

interface RouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <Layout>
      <HeadContent />
      <Outlet />
      <TanStackRouterDevtools />
    </Layout>
  ),
  notFoundComponent: NotFoundScreen,
  errorComponent: ({ error }) => (
    <Layout>
      <ErrorScreen error={error} />
    </Layout>
  ),
});

function Layout({ children }: { children: ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <AppHeader
          handlers={{
            mobileOpened,
            desktopOpened,
            toggleMobile,
            toggleDesktop,
          }}
        />
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppNavigation
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
