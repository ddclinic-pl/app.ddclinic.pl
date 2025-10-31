import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Group, Stack, Title } from "@mantine/core";
import { getAppointments } from "../api.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AppointmentsTimeline } from "../components/AppointmentsTimeline.tsx";
import { queryClient } from "../queryClient.ts";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { Appointment } from "../api-types.ts";
import BottomImage from "../components/BottomImage.tsx";

function MyAppointments() {
  const { date } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const appointmentsQuery = useSuspenseQuery(getAppointments(date));
  return (
    <Stack>
      <Group justify="space-between">
        <Title size="xl">Moje wizyty</Title>
        <DatePickerInput
          leftSection={<IconCalendar size={18} stroke={1.5} />}
          leftSectionPointerEvents="none"
          value={date}
          firstDayOfWeek={1}
          weekendDays={[0, 6]}
          onChange={(date) =>
            navigate({
              search: (prev) => ({ ...prev, date: date || "" }),
            })
          }
          dropdownType="modal"
          valueFormat="YYYY-MM-DD"
        />
      </Group>
      <Appointments appointments={appointmentsQuery.data} />
    </Stack>
  );
}

function Appointments({ appointments }: { appointments: Appointment[] }) {
  if (appointments.length == 0) return <NoAppointments />;
  return <AppointmentsTimeline appointments={appointments} />;
}

function NoAppointments() {
  return (
    <BottomImage
      image="/undraw_hot-air-balloon_6knx.svg"
      message="Brak wizyt"
    />
  );
}

export const Route = createFileRoute("/")({
  component: MyAppointments,
  validateSearch: (search) => ({
    date: dayjs().format("YYYY-MM-DD"),
    ...search,
  }),
  loaderDeps: (context) => ({ date: context.search.date }),
  loader: (context) =>
    queryClient.ensureQueryData(getAppointments(context.deps.date)),
  head: () => ({
    meta: [
      {
        title: "Moje wizyty",
      },
    ],
  }),
});
