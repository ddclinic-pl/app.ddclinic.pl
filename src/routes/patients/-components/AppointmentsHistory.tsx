import { AppointmentsTimeline } from "../../../components/AppointmentsTimeline.tsx";
import { useQuery } from "@tanstack/react-query";
import { getPatientAppointments } from "../../../api.ts";
import { Loader } from "@mantine/core";

export default function AppointmentsHistory({
  id,
  filter,
}: {
  id: string;
  filter: "planned" | "past";
}) {
  console.log(filter);
  const appointmentsQuery = useQuery(getPatientAppointments(id));
  if (appointmentsQuery.isLoading || !appointmentsQuery.data) return <Loader />;
  return <AppointmentsTimeline appointments={appointmentsQuery.data} />;
}
