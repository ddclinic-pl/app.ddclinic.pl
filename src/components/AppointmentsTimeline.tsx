import { AppointmentResponse } from "../api-types.ts";
import {
  ActionIcon,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
} from "@mantine/core";
import { IconBell, IconCalendar, IconUserSearch } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

interface AppointmentTimelineProps {
  appointments: AppointmentResponse[];
}

export function AppointmentsTimeline({
  appointments,
}: AppointmentTimelineProps) {
  const navigate = useNavigate();
  return (
    <Timeline
      reverseActive
      active={
        appointments.findIndex(
          (appointment) =>
            new Date(`${appointment.date}T${appointment.endTime}:00Z`) >
            new Date(),
        ) - 1
      }
      color="green"
      bulletSize={32}
      lineWidth={2}
    >
      {appointments.map((appointment, index) => {
        return appointment.patient ? (
          <Timeline.Item bullet={<IconCalendar size={16} />} key={index}>
            <Group justify="space-between">
              <Stack justify="space-between" gap={0}>
                <Text fw={500} size="md">
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </Text>
                <Text size="xs">
                  {appointment.startTime} - {appointment.endTime}
                </Text>
              </Stack>
              <ActionIcon
                variant="transparent"
                aria-label="Historia wizyt"
                onClick={() =>
                  navigate({ to: `/patients/${appointment.patient?.id}` })
                }
              >
                <IconUserSearch />
              </ActionIcon>
            </Group>
          </Timeline.Item>
        ) : (
          <Timeline.Item
            bullet={
              <ThemeIcon
                size={32}
                color={
                  new Date(appointment.startTime) < new Date() ? "gray" : "lime"
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
  );
}
