import { PatientSearchResultItemResponse } from "../../../api-types.ts";
import { useNavigate } from "@tanstack/react-router";
import FullScreenLoader from "../../../components/FullScreenLoader.tsx";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconChevronRight, IconHome, IconPhoneCall } from "@tabler/icons-react";
import BottomImage from "../../../components/BottomImage.tsx";

export function PatientSearchResults({
  query,
  patients = [],
  isLoading,
}: {
  query?: string;
  patients?: PatientSearchResultItemResponse[];
  isLoading: boolean;
}) {
  const navigate = useNavigate();
  if (isLoading) return <FullScreenLoader />;
  if (!query) return <NoQuery />;
  if (patients.length === 0) return <NoPatientsFound />;
  return (
    <Stack>
      {patients.map((patient) => {
        return (
          <Group wrap="nowrap" key={patient.id}>
            <Avatar
              size={80}
              radius="md"
              onClick={() => navigate({ to: `/patients/${patient.id}` })}
            />
            <Box>
              <Text
                fz="md"
                fw={500}
                onClick={() => navigate({ to: `/patients/${patient.id}` })}
              >
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
            <Box
              flex="1"
              display="flex"
              h="80px"
              style={{ justifyContent: "flex-end", alignItems: "center" }}
            >
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

function NoQuery() {
  return <BottomImage image="/undraw_choose_5kz4.svg" />;
}

function NoPatientsFound() {
  return (
    <BottomImage image="/undraw_no-data_ig65.svg" message="Brak wyników" />
  );
}
