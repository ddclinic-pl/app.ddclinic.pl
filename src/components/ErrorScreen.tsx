import { Container, Image, Stack, Text } from "@mantine/core";
import { useRouter } from "@tanstack/react-router";

export function ErrorScreen({ error }: { error: Error }) {
  const router = useRouter();
  return (
    <Container size="sm">
      <Stack gap="lg" align="center" p="xl">
        <Image src="/undraw_server-error_syuz.svg" alt="error" />
        <Text size="lg" style={{ textWrap: "balance" }} ta="center">
          {error.message}
        </Text>
        <button
          onClick={() => {
            router.invalidate();
          }}
        >
          test
        </button>
      </Stack>
    </Container>
  );
}
