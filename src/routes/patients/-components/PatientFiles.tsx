import { PatientFileResponse } from "../../../api-types.ts";
import { Group, Stack, Text } from "@mantine/core";
import { IconFileDownload } from "@tabler/icons-react";

export default function PatientFiles({
  files,
}: {
  files: PatientFileResponse[];
}) {
  return (
    <Stack ml="xs">
      {files.map((file) => (
        <Group key={file.id} justify="space-between" align="center">
          <Group gap="xs">
            <IconFileDownload size={16} />
            <Text size="xs">{file.fileName}</Text>
          </Group>
        </Group>
      ))}
    </Stack>
  );
}
