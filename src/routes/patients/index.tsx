import { createFileRoute } from "@tanstack/react-router";
import {
  Avatar,
  Box,
  Group,
  Input,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { getPatients } from "../../api.ts";
import { useQuery } from "@tanstack/react-query";
import { PatientSearchResultItemResponse } from "../../api-types.ts";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { IconAt, IconPhoneCall } from "@tabler/icons-react";

export const Route = createFileRoute("/patients/")({
  component: PatientsBrowse,
  head: () => ({
    meta: [{ title: "Pacjenci" }],
  }),
});

function PatientsBrowse() {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);
  const patientsQuery = useQuery(getPatients(debounced));
  return (
    <Stack gap="md">
      <Box
        style={{
          position: "sticky",
          top: 60,
          zIndex: 100,
          background: "var(--mantine-color-body)",
          margin: -16,
          padding: 16,
          marginTop: -16,
          paddingBottom: 24,
        }}
      >
        <Stack gap="sm">
          <Title size="xl">Wyszukaj pacjenta</Title>
          <Input
            placeholder="Input component"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Stack>
      </Box>
      <PatientSearchResults
        isLoading={patientsQuery.isLoading}
        patients={patientsQuery.data}
      />
    </Stack>
  );
}

function PatientSearchResults({
  patients = [],
  isLoading,
}: {
  patients?: PatientSearchResultItemResponse[];
  isLoading: boolean;
}) {
  if (isLoading) return <Loader />;
  return (
    <Stack>
      {patients.map((patient) => {
        return (
          <Group wrap="nowrap">
            <Avatar size={80} radius="md" />
            <Box>
              <Text fz="lg" fw={500}>
                {patient.displayName}
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size={16} />
                <Text fz="xs" c="dimmed">
                  {patient.phoneNumber}
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size={16} />
                <Text fz="xs" c="dimmed">
                  {patient.city}
                </Text>
              </Group>
            </Box>
          </Group>
        );
      })}
    </Stack>
  );
}
