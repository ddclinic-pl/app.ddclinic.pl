import { createFileRoute } from "@tanstack/react-router";
import { Avatar, Group, Paper, Stack, Text } from "@mantine/core";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Stack>
      <Text>
        Wersja: <strong>{__APP_DDCLINIC_PL_VERSION__}</strong>
      </Text>
      <Paper withBorder radius="md" p="md">
        <Group>
          <Avatar alt="Bartosz Gałek" radius="xl">
            BG
          </Avatar>
          <div>
            <Text fz="sm">Bartosz Gałek</Text>
            <Text fz="xs" c="dimmed">
              10 minutes ago
            </Text>
          </div>
        </Group>
        <Text pl={54} pt="sm" size="sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
          nisl eget aliquam tincidunt, nisl nisl tincidunt nisl, eget aliquam
          nisl nisl nec nisl. Nunc euismod, nisl eget aliquam tincidunt, nisl
        </Text>
      </Paper>
    </Stack>
  );
}
