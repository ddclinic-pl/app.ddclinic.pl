import { Image, Stack, Text } from "@mantine/core";

export default function CenterImage({
  image,
  message = "",
}: {
  image: string;
  message?: string;
}) {
  return (
    <Stack align="center" justify="center" h="calc(100vh - 200px)" p="md">
      <Image src={image} mah="50%" width="auto" fit="contain" alt={message} />
      {message && (
        <Text p="md" size="xl" c="gray" style={{ textWrap: "balance" }}>
          {message}
        </Text>
      )}
    </Stack>
  );
}
