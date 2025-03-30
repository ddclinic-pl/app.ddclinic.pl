import { Group, Loader, Table, Text } from "@mantine/core";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

interface Appointment {
  date: string;
  startTime: string;
  endTime: string;
  patient?: {
    firstName: string;
    lastName: string;
  };
}

export function UsersTable() {
  const auth = useAuth();
  const query = useQuery<Appointment[]>({
    queryKey: ["test-query"],
    queryFn: async () => {
      const token = await auth.getToken({ template: "api-ddclinic-pl" });
      return fetch(
        "https://api.ddclinic.pl/appointments?date=2024-03-20&id=58",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ).then((response) => response.json());
    },
  });
  if (query.isLoading || !query.data) return <Loader />;
  const rows = query.data
    .filter((it) => it.patient)
    .map((item, index) => (
      <Table.Tr key={index}>
        <Table.Td>
          <Group gap="sm">
            <Text fz="sm" fw={500}>
              {item.patient?.firstName} {item.patient?.lastName}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Text fz="sm" fw={500}>
              {item.startTime} - {item.endTime}
            </Text>
          </Group>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Pacjent</Table.Th>
            <Table.Th>Godzina</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
