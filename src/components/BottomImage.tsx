import { Image, Stack, Text } from "@mantine/core";

export default function BottomImage({
  image,
  message = "",
}: {
  image: string;
  message?: string;
}) {
  return (
    <Stack p="md" align="center" justify="end">
      <Image src={image} maw="80vw" />
      {message && (
        <Text p="md" size="xl" c="gray">
          {message}
        </Text>
      )}
    </Stack>
  );
}
