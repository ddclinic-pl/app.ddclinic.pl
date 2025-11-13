import { Box, Group, ScrollArea, Stack, Title } from "@mantine/core";
import { ReactElement } from "react";

export default function FullScreenRoute({
  title,
  children,
  action,
}: {
  title?: string;
  children: ReactElement | ReactElement[];
  action?: ReactElement;
}) {
  return (
    <Stack h="100%">
      {title && (
        <Group justify="space-between">
          <Title size="xl">{title}</Title>
          <Box>{action}</Box>
        </Group>
      )}
      <ScrollArea.Autosize mah="100%" type="never">
        {children}
      </ScrollArea.Autosize>
    </Stack>
  );
}
