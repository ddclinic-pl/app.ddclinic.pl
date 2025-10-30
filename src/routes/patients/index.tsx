import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ActionIcon,
  Anchor,
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
import { PatientSearchResultItemResponse } from "../../api-types.ts";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { IconChevronRight, IconHome, IconPhoneCall } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

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
            placeholder="Jan Kowalski"
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
  const navigate = useNavigate();
  if (isLoading) return <Loader />;
  return (
    <Stack>
      {patients.map((patient) => {
        return (
          <Group wrap="nowrap" key={patient.id}>
            <Avatar size={80} radius="md" />
            <Box>
              <Text fz="lg" fw={500}>
                {patient.displayName}
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconPhoneCall stroke={1.5} size={16} />
                <Anchor
                  href={
                    patient.phoneNumber
                      ? `tel:${patient.phoneNumber}`
                      : undefined
                  }
                  fz="xs"
                >
                  {patient.phoneNumber ? patient.phoneNumber : "Brak numeru"}
                </Anchor>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconHome stroke={1.5} size={16} />
                <Text fz="xs" c="dimmed">
                  {patient.city}
                </Text>
              </Group>
            </Box>
            <Box flex="1" display="flex" style={{ justifyContent: "flex-end" }}>
              <ActionIcon
                variant="transparent"
                onClick={() => navigate({ to: `/patients/${patient.id}` })}
              >
                <IconChevronRight />
              </ActionIcon>
            </Box>
          </Group>
        );
      })}
    </Stack>
  );
}
