import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getMyLeaves } from "../../api.ts";
import { Alert, Badge, Box, Card, Group, Stack, Text } from "@mantine/core";
import { IconCalendar, IconInfoCircle } from "@tabler/icons-react";
import { queryClient } from "../../queryClient.ts";
import FullScreenLoader from "../../components/FullScreenLoader.tsx";
import { YearPickerInput } from "@mantine/dates";
import { LeaveResponse } from "../../api-types.ts";
import dayjs, { Dayjs } from "dayjs";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";

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
    <FullScreenRoute
      title="Moje urlopy"
      action={
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
      }
    >
      <Stack gap="sm">
        <LeavesCards data={leavesQuery.data} />
      </Stack>
    </FullScreenRoute>
  );
}

function LeavesCards({ data }: { data: LeaveResponse[] }) {
  if (data.length === 0) {
    return (
      <Alert icon={<IconInfoCircle size={16} />} variant="light">
        Brak wniosków urlopowych w tym roku.
      </Alert>
    );
  }
  return (
    <>
      {data.map((leave) => {
        const fromDate = dayjs(leave.dateFrom);
        const toDate = dayjs(leave.dateTo);
        return (
          <Card key={leave.id} withBorder>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                  {leave.type}
                </Text>
                <Badge size="xs" color="yellow">
                  {leave.status}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Group>
                  <CalendarCard date={fromDate} />
                  <Text c="dimmed">-</Text>
                  <CalendarCard date={toDate} />
                </Group>
                <Text size="md">4 dni</Text>
              </Group>
              {leave.deputy && (
                <Text size="xs">
                  Zastępstwo: <strong>{leave.deputy}</strong>
                </Text>
              )}
              {leave.comment && (
                <Text size="xs" mt={6}>
                  {leave.comment}
                </Text>
              )}
            </Stack>
          </Card>
        );
      })}
    </>
  );
}

function CalendarCard({ date }: { date: Dayjs }) {
  return (
    <Box py={8}>
      <Stack gap={2} align="center" justify="center">
        <Text size="xs">{date.format("MMM")}</Text>
        <Text size="xs" fw="bold">
          {date.format("DD")}
        </Text>
      </Stack>
    </Box>
  );
}
