import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getMyAppointments } from "../../api.ts";
import { AppointmentsTimeline } from "../../components/AppointmentsTimeline.tsx";
import { queryClient } from "../../queryClient.ts";
import dayjs from "dayjs";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import { AppointmentResponse } from "../../api-types.ts";
import CenterImage from "../../components/CenterImage.tsx";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";

export const Route = createFileRoute("/appointments/")({
  component: MyAppointments,
  validateSearch: (search) => ({
    date: dayjs().format("YYYY-MM-DD"),
    ...search,
  }),
  loaderDeps: (context) => ({ date: context.search.date }),
  loader: (context) =>
    queryClient.ensureQueryData(getMyAppointments(context.deps.date)),
  head: () => ({
    meta: [
      {
        title: "Moje wizyty",
      },
    ],
  }),
});

function MyAppointments() {
  const { date } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const appointments = Route.useLoaderData();
  return (
    <FullScreenRoute
      title="Moje wizyty"
      action={
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
      }
    >
      <Appointments appointments={appointments} />
    </FullScreenRoute>
  );
}

function Appointments({
  appointments,
}: {
  appointments: AppointmentResponse[];
}) {
  if (appointments.length == 0) return <NoAppointments />;
  return <AppointmentsTimeline appointments={appointments} />;
}

function NoAppointments() {
  return (
    <CenterImage
      image="/undraw_hot-air-balloon_6knx.svg"
      message="Brak wizyt"
    />
  );
}
