import { Loader, Stack } from "@mantine/core";

export default function FullScreenLoader() {
  return (
    <Stack align="center" justify="center" gap="md" h="100%">
      <Loader />
    </Stack>
  );
}
