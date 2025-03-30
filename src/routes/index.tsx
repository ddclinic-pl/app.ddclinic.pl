import { createFileRoute } from "@tanstack/react-router";
import { Stack, Title } from "@mantine/core";
import { getAppointments } from "../api.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import FullScreenLoader from "../components/FullScreenLoader.tsx";
import { AppointmentsTimeline } from "../components/AppointmentsTimeline.tsx";

export const Route = createFileRoute("/")({
  component: MyAppointments,
  pendingComponent: FullScreenLoader,
});

function MyAppointments() {
  const appointmentsQuery = useSuspenseQuery(getAppointments("2024-03-20"));
  return (
    <Stack>
      <Title size="xl">Twoje wizyty</Title>
      <AppointmentsTimeline appointments={appointmentsQuery.data} />
    </Stack>
  );
}
