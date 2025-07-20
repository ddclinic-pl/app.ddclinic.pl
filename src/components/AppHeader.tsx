import { Burger, Group, Image } from "@mantine/core";
import { UserButton } from "@clerk/clerk-react";

export function AppHeader({
  handlers,
}: {
  handlers: {
    mobileOpened: boolean;
    desktopOpened: boolean;
    toggleMobile: () => void;
    toggleDesktop: () => void;
  };
}) {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={handlers.mobileOpened}
          onClick={handlers.toggleMobile}
          hiddenFrom="sm"
          size="sm"
        />
        <Burger
          opened={handlers.desktopOpened}
          onClick={handlers.toggleDesktop}
          visibleFrom="sm"
          size="sm"
        />
        <Image src="/logo.svg" w="auto" h={24} />
      </Group>
      <UserButton />
    </Group>
  );
}
