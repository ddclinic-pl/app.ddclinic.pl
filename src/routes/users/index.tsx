import { createFileRoute } from "@tanstack/react-router";
import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Menu,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import FullScreenLoader from "../../components/FullScreenLoader.tsx";
import { getUsers } from "../../api.ts";
import { modals } from "@mantine/modals";
import { AddUserForm } from "./AddUserForm.tsx";
import { ApplicationUser } from "../../api-types.ts";
import {
  IconDotsVertical,
  IconLock,
  IconPlus,
  IconRefresh,
  IconTrash,
} from "@tabler/icons-react";

export const Route = createFileRoute("/users/")({
  component: Users,
  pendingComponent: FullScreenLoader,
});

function Users() {
  const usersQuery = useSuspenseQuery(getUsers());
  return (
    <Stack>
      <Group justify="space-between">
        <Title size="xl">Użytkownicy aplikacji</Title>
        <ActionIcon variant="filled" aria-label="Settings">
          <IconPlus
            style={{ width: "70%", height: "70%" }}
            stroke={1.5}
            onClick={() => {
              modals.open({
                modalId: "add-user",
                title: "Dodawanie użytkownika",
                centered: true,
                closeOnClickOutside: false,
                children: (
                  <AddUserForm
                    onCancel={() => modals.close("add-user")}
                    onSubmit={() => modals.close("add-user")}
                  />
                ),
              });
            }}
          />
        </ActionIcon>
      </Group>
      <UsersRolesTable data={usersQuery.data} />
    </Stack>
  );
}

export function UsersRolesTable({ data }: { data: ApplicationUser[] }) {
  const rows = data.map((item) => (
    <Table.Tr key={item.displayName}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={40} radius={40} name={item.displayName} />
          <Stack gap={0}>
            <Text fz="sm" fw={500}>
              {item.displayName}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </Stack>
          <Box flex="1" display="flex" style={{ justifyContent: "flex-end" }}>
            <Menu shadow="md" position="bottom-end">
              <Menu.Target>
                <ActionIcon variant="transparent" aria-label="Settings">
                  <IconDotsVertical
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Konto użytkownika</Menu.Label>
                <Menu.Item leftSection={<IconRefresh size={14} />}>
                  Zresetuj hasło
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item leftSection={<IconLock size={14} />}>
                  Zablokuj
                </Menu.Item>
                <Menu.Item color="red" leftSection={<IconTrash size={14} />}>
                  Usuń
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>
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
