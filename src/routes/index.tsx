import { createFileRoute } from "@tanstack/react-router";
import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from "@mantine/core";
import { appointmentsQueryOptions } from "../api.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import FullScreenLoader from "../components/FullScreenLoader.tsx";
import { IconBell, IconCalendar, IconHistory } from "@tabler/icons-react";

export const Route = createFileRoute("/")({
  component: Index,
  pendingComponent: FullScreenLoader,
});

function Index() {
  const postsQuery = useSuspenseQuery(appointmentsQueryOptions("2024-03-20"));

  const data = postsQuery.data.sort(
    (a, b) =>
      new Date(`${a.date}T${a.startTime}:00Z`).getTime() -
      new Date(`${b.date}T${b.startTime}:00Z`).getTime(),
  );
  return (
    <Stack>
      <Title size="xl">Twoje wizyty</Title>
      <Timeline
        reverseActive
        active={
          data.findIndex(
            (appointment) =>
              new Date(`${appointment.date}T${appointment.endTime}:00Z`) >
              new Date(),
          ) - 1
        }
        color="green"
        bulletSize={32}
        lineWidth={2}
      >
        {data.map((appointment, index) => {
          if (appointment.patient)
            return (
              <Timeline.Item bullet={<IconCalendar size={16} />} key={index}>
                <Group justify="space-between">
                  <Stack justify="space-between" gap={0}>
                    <Text fw={500} size="md">
                      {appointment.patient.firstName}{" "}
                      {appointment.patient.lastName}
                    </Text>
                    <Text size="xs">
                      {appointment.startTime} - {appointment.endTime}
                    </Text>
                  </Stack>
                  <ActionIcon variant="transparent" aria-label="Historia wizyt">
                    <IconHistory />
                  </ActionIcon>
                </Group>
              </Timeline.Item>
            );
          return (
            <Timeline.Item
              bullet={
                <ThemeIcon
                  size={32}
                  color={
                    new Date(appointment.startTime) < new Date()
                      ? "gray"
                      : "lime"
                  }
                  variant="filled"
                  radius="xl"
                >
                  <IconBell size={16} />
                </ThemeIcon>
              }
              title={appointment.notes}
              key={index}
            >
              <Text size="xs" mt={4}>
                {appointment.startTime} - {appointment.endTime}
              </Text>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Stack>
  );
}
