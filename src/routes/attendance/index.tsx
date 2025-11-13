import { Accordion, Button, Group, Stack, Text } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { IconClockPlay, IconClockStop } from "@tabler/icons-react";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";

// Mock data for demonstration
const attendanceData = [
  { date: "2025-11-01", hours: null, holiday: true, entries: ["18:49"] },
  { date: "2025-10-14", hours: "08:10", holiday: false, entries: ["08:10"] },
  {
    date: "2025-10-13",
    hours: "10:24",
    holiday: false,
    entries: ["11:07", "21:31"],
  },
  { date: "2025-10-12", hours: "Niedziela", holiday: true, entries: [] },
];

export const Route = createFileRoute("/attendance/")({
  component: Attendance,
});

export default function Attendance() {
  return (
    <FullScreenRoute title="Moje godziny pracy">
      <>
        <Text size="md">Razem: 24h</Text>
        <Accordion>
          {attendanceData.map((day) => (
            <Accordion.Item key={day.date} value={day.date}>
              <Accordion.Control>
                <Group justify="space-between" pr="sm">
                  <Text>{day.date}</Text>
                  <Text c="dimmed">6h</Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Group justify="space-between" p="sm">
                  <Stack gap="sm">
                    <Text c="dimmed" size="sm">
                      Wejście
                    </Text>
                    <Group>
                      <IconClockPlay />
                      <Text>10:00</Text>
                    </Group>
                  </Stack>
                  <Stack gap="sm">
                    <Text c="dimmed" size="sm">
                      Wyjście
                    </Text>
                    <Group>
                      <IconClockStop />
                      <Text>18:00</Text>
                    </Group>
                  </Stack>
                </Group>
                <Button disabled variant="light" fullWidth>
                  Popraw godziny pracy
                </Button>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </>
    </FullScreenRoute>
  );
}
