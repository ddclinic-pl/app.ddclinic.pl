import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
  getPatient,
  getPatientAppointments,
  getPatientFiles,
  getPatientPhotos,
} from "../../api.ts";
import {
  Accordion,
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCameraSelfie,
  IconChevronLeft,
  IconFile,
  IconHome,
  IconPhoneCall,
  IconPhoto,
} from "@tabler/icons-react";
import PatientAppointments from "./-components/PatientAppointments.tsx";
import PatientPhotos from "./-components/PatientPhotos.tsx";
import PatientFiles from "./-components/PatientFiles.tsx";
import { queryClient } from "../../queryClient.ts";
import dayjs from "dayjs";

export const Route = createFileRoute("/patients/$patientId")({
  component: PatientDetails,
  loader: (context) => {
    const id = context.params.patientId;
    return Promise.all([
      queryClient.ensureQueryData(getPatient(id)),
      queryClient.ensureQueryData(getPatientAppointments(id)),
      queryClient.ensureQueryData(getPatientPhotos(id)),
      queryClient.ensureQueryData(getPatientFiles(id)),
    ]);
  },
  head: () => ({
    meta: [{ title: "Pacjent" }],
  }),
});

function PatientDetails() {
  const router = useRouter();
  const [patient, appointments, photos, files] = Route.useLoaderData();
  const groupedAppointments = Object.groupBy(appointments, ({ date }) =>
    dayjs(date).isBefore(dayjs()) ? "past" : "planned",
  );

  return (
    <Stack>
      <Group wrap="nowrap">
        <Avatar size={80} radius="md" />
        <Box>
          <Text fz="lg" fw={500}>
            {patient.displayName}
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconPhoneCall stroke={1.5} size={16} />
            <Anchor href={`tel:${patient.phoneNumber}`} fz="xs">
              {patient.phoneNumber}
            </Anchor>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconHome stroke={1.5} size={16} />
            <Text fz="xs" c="dimmed">
              {patient.city}
            </Text>
          </Group>
        </Box>
        <Box
          flex="1"
          display="flex"
          h="80px"
          style={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <ActionIcon
            variant="transparent"
            onClick={() => router.history.back()}
          >
            <IconChevronLeft />
          </ActionIcon>
        </Box>
      </Group>

      <Accordion radius="md">
        <Accordion.Item value="planowane-wizyty">
          <Accordion.Control
            disabled={!groupedAppointments.planned?.length}
            icon={
              <IconPhoto
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            <Group justify="space-between" pr="sm">
              <Text>Planowane wizyty</Text>
              <Counter value={groupedAppointments.planned?.length} />
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <PatientAppointments appointments={groupedAppointments.planned} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="historia-wizyt">
          <Accordion.Control
            disabled={!groupedAppointments.past?.length}
            icon={
              <IconPhoto
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            <Group justify="space-between" pr="sm">
              <Text>Historia wizyt</Text>
              <Counter value={groupedAppointments.past?.length} />
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <PatientAppointments appointments={groupedAppointments.past} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="zdjecia">
          <Accordion.Control
            disabled={!photos.length}
            icon={
              <IconCameraSelfie
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            <Group justify="space-between" pr="sm">
              <Text>Zdjęcia</Text>
              <Counter value={photos.length} />
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <PatientPhotos photos={photos} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="pliki">
          <Accordion.Control
            disabled={!files.length}
            icon={
              <IconFile
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            <Group justify="space-between" pr="sm">
              <Text>Pliki</Text>
              <Counter value={files.length} />
            </Group>
          </Accordion.Control>
          <Accordion.Panel>
            <PatientFiles files={files} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}

function Counter({ value = 0 }: { value?: number }) {
  return (
    <Badge variant="light" size="sm">
      {value}
    </Badge>
  );
}
