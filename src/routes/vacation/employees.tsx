import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getLeavesByManager } from "../../api.ts";
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

export const Route = createFileRoute("/vacation/employees")({
  component: EmployeesLeaves,
});

function formatDate(d?: string) {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
}

function EmployeesLeaves() {
  const { data, isLoading } = useQuery(getLeavesByManager());
  return (
    <Stack>
      <Group justify="space-between" align="baseline">
        <Title order={3}>Wnioski urlopowe pracowników</Title>
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
          Brak wniosków do wyświetlenia.
        </Alert>
      )}
      <Stack>
        {data?.map((leave) => (
          <Card key={leave.id} withBorder>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Text fw={600}>{leave.requester || "Pracownik"}</Text>
                <Text size="sm" c="dimmed">
                  {leave.type} • {formatDate(leave.dateFrom)} —{" "}
                  {formatDate(leave.dateTo)}
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
                {leave.createdAt && (
                  <Text size="xs" c="dimmed">
                    Złożono: {formatDate(leave.createdAt)}
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
