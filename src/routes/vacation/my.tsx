import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyLeaves } from "../../api.ts";
import { Alert, Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import { IconCalendar, IconInfoCircle } from "@tabler/icons-react";
import { queryClient } from "../../queryClient.ts";
import FullScreenLoader from "../../components/FullScreenLoader.tsx";
import dayjs from "dayjs";
import { YearPickerInput } from "@mantine/dates";

export const Route = createFileRoute("/vacation/my")({
  component: MyLeaves,
  validateSearch: (search) => ({
    year: new Date().getFullYear(),
    ...search,
  }),
  loaderDeps: (context) => ({ year: context.search.year }),
  loader: (context) =>
    queryClient.ensureQueryData(getMyLeaves(context.deps.year)),
});

function MyLeaves() {
  const { year } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const leavesQuery = useSuspenseQuery(getMyLeaves(year));
  if (leavesQuery.isLoading || !leavesQuery.data) return <FullScreenLoader />;
  return (
    <Stack>
      <Group justify="space-between">
        <Title size="xl">Moje urlopy</Title>
        <YearPickerInput
          leftSection={<IconCalendar size={18} stroke={1.5} />}
          leftSectionPointerEvents="none"
          value={String(year)}
          onChange={(year) => {
            if (!year) return;
            return navigate({
              search: (prev) => ({
                ...prev,
                year: Number(year.substring(0, 4)),
              }),
            });
          }}
          dropdownType="modal"
          valueFormat="YYYY"
        />
      </Group>

      {leavesQuery.data?.length === 0 && (
        <Alert icon={<IconInfoCircle size={16} />} variant="light">
          Brak wniosków urlopowych w tym roku.
        </Alert>
      )}

      <Stack>
        {leavesQuery.data.map((leave) => (
          <Card key={leave.id} withBorder>
            <Group justify="space-between">
              <Box>
                <Text fw={600}>{leave.type}</Text>
                <Text size="sm" c="dimmed">
                  {dayjs(leave.dateFrom).format("DD-MM-YYYY")} —{" "}
                  {dayjs(leave.dateTo).format("DD-MM-YYYY")}
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
