import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyLeaves } from "../../api.ts";
import { useUser } from "@clerk/clerk-react";
import {
  Alert,
  Anchor,
  Box,
  Card,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import type { LeaveResponse } from "../../api-types.ts";

export const Route = createFileRoute("/vacation/my")({
  component: MyLeaves,
});

function formatDate(d?: string) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
}

function MyLeaves() {
  const { user } = useUser();
  const userId = user?.id || "";
  const year = new Date().getFullYear();

  const { data, isLoading } = useQuery(
    userId
      ? getMyLeaves(userId, year)
      : {
          queryKey: ["leave", "my", userId, year],
          enabled: false,
          queryFn: async () => [] as LeaveResponse[],
        },
  );

  return (
    <Stack>
      <Group justify="space-between" align="baseline">
        <Title order={3}>Moje wnioski urlopowe — {year}</Title>
        <Anchor component={Link} to="/vacation">
          Nowy wniosek
        </Anchor>
      </Group>
      {isLoading && (
        <Group gap="xs">
          <Loader size="sm" />
          <Text>Ładowanie...</Text>
        </Group>
      )}
      {!isLoading && (data?.length ?? 0) === 0 && (
        <Alert icon={<IconInfoCircle size={16} />} variant="light">
          Brak wniosków urlopowych w tym roku.
        </Alert>
      )}
      <Stack>
        {data?.map((leave) => (
          <Card key={leave.id} withBorder>
            <Group justify="space-between">
              <Box>
                <Text fw={600}>{leave.type}</Text>
                <Text size="sm" c="dimmed">
                  {formatDate(leave.dateFrom)} — {formatDate(leave.dateTo)}
                </Text>
                {leave.comment && (
                  <Text size="sm" mt={6}>
                    Komentarz: {leave.comment}
                  </Text>
                )}
              </Box>
              <Stack gap={2} align="end">
                <Text size="sm">
                  Status: <strong>{leave.status}</strong>
                </Text>
                {leave.deputy && (
                  <Text size="xs" c="dimmed">
                    Zastępstwo: {leave.deputy}
                  </Text>
                )}
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
}
