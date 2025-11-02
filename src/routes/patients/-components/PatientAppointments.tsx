import { Group, Stack, Text } from "@mantine/core";
import { IconCalendar, IconClock } from "@tabler/icons-react";
import { PatientAppointmentResponse } from "../../../api-types.ts";

export default function PatientAppointments({
  appointments = [],
}: {
  appointments?: PatientAppointmentResponse[];
}) {
  return (
    <Stack>
      {appointments.map((appointment) => (
        <Stack gap={4}>
          <Group
            key={appointment.date + appointment.startTime + appointment.endTime}
            justify="space-between"
            align="center"
          >
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="xs" component="time" dateTime={appointment.date}>
                {appointment.date}
              </Text>
            </Group>
            <Group gap="xs">
              <IconClock size={16} />
              <Text size="xs">
                <time dateTime={appointment.startTime}>
                  {appointment.startTime}
                </time>
                <span> - </span>
                <time dateTime={appointment.endTime}>
                  {appointment.endTime}
                </time>
              </Text>
            </Group>
          </Group>
          <Text size="xs" c="dimmed">
            {appointment.notes}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
}
