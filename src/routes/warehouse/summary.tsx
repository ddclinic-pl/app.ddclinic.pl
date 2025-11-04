import { createFileRoute } from "@tanstack/react-router";
import { Badge, Group, Progress, Stack, Table, Title } from "@mantine/core";
import type { WarehouseProduct } from "../../api-types";
import { queryClient } from "../../queryClient.ts";
import { getWarehouseSummary } from "../../api.ts";

export const Route = createFileRoute("/warehouse/summary")({
  component: WarehouseSummaryView,
  loader: () => queryClient.ensureQueryData(getWarehouseSummary()),
  head: () => ({
    meta: [{ title: "Magazyn: Podsumowanie" }],
  }),
});

function WarehouseSummaryView() {
  const items = Route.useLoaderData();
  return (
    <Stack>
      <Group justify="space-between">
        <Title order={3}>Przegląd magazynu</Title>
        <Badge>{items.length}</Badge>
      </Group>
      <StockTable items={items} />
    </Stack>
  );
}

function StockTable({ items }: { items: WarehouseProduct[] }) {
  return (
    <>
      <Table striped withColumnBorders withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Produkt</Table.Th>
            <Table.Th>Stan</Table.Th>
            <Table.Th>Poziom</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((p) => (
            <Table.Tr key={p.id}>
              <Table.Td>{p.name}</Table.Td>
              <Table.Td>{p.currentStock ?? 0}</Table.Td>
              <Table.Td>
                <Progress
                  value={Math.min(100, ((p.currentStock || 0) / 500) * 100)}
                  size="sm"
                  radius="sm"
                  color={
                    (p.currentStock || 0) < 50
                      ? "red"
                      : (p.currentStock || 0) < 150
                        ? "yellow"
                        : "green"
                  }
                />
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
}
