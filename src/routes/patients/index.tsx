import { createFileRoute } from "@tanstack/react-router";
import { Box, Card, Group, Stack, Text, Title } from "@mantine/core";
import PatientPicker from "../../components/PatientPicker.tsx";
import { useQueryState } from "nuqs";
import { getPatient } from "../../api.ts";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/patients/")({
  component: PatientsBrowse,
  head: () => ({
    meta: [{ title: "Pacjenci" }],
  }),
});

function PatientsBrowse() {
  const [selectedPatient, setSelectedPatient] = useQueryState("patient");
  const patient = useQuery(getPatient(selectedPatient));
  return (
    <Stack>
      <Title size="xl">Wyszukaj pacjenta</Title>
      <PatientPicker initial={patient.data} onSelect={setSelectedPatient} />
      {patient.data && (
        <Card withBorder>
          <Group justify="space-between" align="flex-start">
            <Box>
              <Text fw={600}>{patient.data.displayName}</Text>
              <Text c="dimmed" size="sm">
                Szczegóły pacjenta będą dostępne wkrótce.
              </Text>
            </Box>
          </Group>
        </Card>
      )}
    </Stack>
  );
}
