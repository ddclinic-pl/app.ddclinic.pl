import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ActionIcon, Avatar, Badge, Group, Table, Text } from "@mantine/core";

const data = [
  {
    avatar:
      "https://dorotowskadentalclinic.pl/zespol/977/image-thumb__977__doctor_preview/piotr-jurkowski@2x.f335768e.webp",
    name: "Dr. n. med. lek. dent. Piotr Jurkowski",
    job: "Specialist in Prosthodontics",
    email: "piotr.jurkowski@ddclinic.pl",
    phone: "+48 501 328 772",
  },
  {
    avatar:
      "https://dorotowskadentalclinic.pl/zespol/977/image-thumb__977__doctor_preview/piotr-jurkowski@2x.f335768e.webp",
    name: "Dr. n. med. lek. dent. Piotr Jurkowski",
    job: "Specialist in Prosthodontics",
    email: "piotr.jurkowski@ddclinic.pl",
    phone: "+48 501 328 772",
  },
  {
    avatar:
      "https://dorotowskadentalclinic.pl/zespol/977/image-thumb__977__doctor_preview/piotr-jurkowski@2x.f335768e.webp",
    name: "Dr. n. med. lek. dent. Piotr Jurkowski",
    job: "Specialist in Prosthodontics",
    email: "piotr.jurkowski@ddclinic.pl",
    phone: "+48 501 328 772",
  },
  {
    avatar:
      "https://dorotowskadentalclinic.pl/zespol/977/image-thumb__977__doctor_preview/piotr-jurkowski@2x.f335768e.webp",
    name: "Dr. n. med. lek. dent. Piotr Jurkowski",
    job: "Specialist in Prosthodontics",
    email: "piotr.jurkowski@ddclinic.pl",
    phone: "+48 501 328 772",
  },
  {
    avatar:
      "https://dorotowskadentalclinic.pl/zespol/977/image-thumb__977__doctor_preview/piotr-jurkowski@2x.f335768e.webp",
    name: "Dr. n. med. lek. dent. Piotr Jurkowski",
    job: "Specialist in Prosthodontics",
    email: "piotr.jurkowski@ddclinic.pl",
    phone: "+48 501 328 772",
  },
];

const jobColors: Record<string, string> = {
  engineer: "blue",
  manager: "cyan",
  designer: "pink",
};

export function UsersTable() {
  const rows = data.map((item) => (
    <Table.Tr key={item.name}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={item.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {item.name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={jobColors[item.job.toLowerCase()]} variant="light">
          {item.job}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Pracownik</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
