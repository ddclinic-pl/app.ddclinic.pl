import { createFileRoute } from "@tanstack/react-router";
import { Avatar, Group, Stack, Table, Text, Title } from "@mantine/core";
import FullScreenLoader from "../components/FullScreenLoader.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import { User } from "../api-types.ts";
import { getUsers } from "../api.ts";

export const Route = createFileRoute("/users")({
  component: Users,
  pendingComponent: FullScreenLoader,
});

function Users() {
  const usersQuery = useSuspenseQuery(getUsers());
  return (
    <Stack>
      <Title size="xl">Użytkownicy aplikacji</Title>
      <UsersRolesTable data={usersQuery.data} />
    </Stack>
  );
}

export function UsersRolesTable({ data }: { data: User[] }) {
  const rows = data.map((item) => (
    <Table.Tr key={item.displayName}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius={40} />
          <Stack gap={0}>
            <Text fz="sm" fw={500}>
              {item.displayName}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email ? item.email : "brak adresu email"}
            </Text>
          </Stack>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table verticalSpacing="sm">
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
