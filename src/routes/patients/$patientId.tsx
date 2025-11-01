import { createFileRoute, useRouter } from "@tanstack/react-router";
import { getPatient } from "../../api.ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Accordion,
  ActionIcon,
  Anchor,
  Avatar,
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
  IconPrinter,
} from "@tabler/icons-react";
import AppointmentsHistory from "./-components/AppointmentsHistory.tsx";
import TreatmentPlans from "./-components/TreatmentPlans";
import PatientPhotos from "./-components/PatientPhotos.tsx";
import PatientFiles from "./-components/PatientFiles.tsx";

export const Route = createFileRoute("/patients/$patientId")({
  component: PatientDetails,
  head: () => ({
    meta: [{ title: "Pacjent" }],
  }),
});

function PatientDetails() {
  const id = Route.useParams().patientId;
  const router = useRouter();
  const { data: patient } = useSuspenseQuery(getPatient(id));
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
            icon={
              <IconPhoto
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            Planowane wizyty
          </Accordion.Control>
          <Accordion.Panel>
            <AppointmentsHistory id={patient.id} filter="planned" />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="historia-wizyt">
          <Accordion.Control
            icon={
              <IconPhoto
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            Historia wizyt
          </Accordion.Control>
          <Accordion.Panel>
            <AppointmentsHistory id={patient.id} filter="past" />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="plan-leczenia">
          <Accordion.Control
            icon={
              <IconPrinter
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            Plany leczenia
          </Accordion.Control>
          <Accordion.Panel>
            <TreatmentPlans />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="zdjecia">
          <Accordion.Control
            icon={
              <IconCameraSelfie
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            Zdjęcia
          </Accordion.Control>
          <Accordion.Panel>
            <PatientPhotos id={patient.id} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="pliki">
          <Accordion.Control
            icon={
              <IconFile
                size={22}
                stroke={1.5}
                color="var(--mantine-color-dimmed)"
              />
            }
          >
            Pliki
          </Accordion.Control>
          <Accordion.Panel>
            <PatientFiles id={patient.id} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
}
