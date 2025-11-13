import { createFileRoute } from "@tanstack/react-router";
import { Badge, Progress, Text } from "@mantine/core";
import type { WarehouseProduct } from "../../api-types";
import { queryClient } from "../../queryClient.ts";
import { getWarehouseSummary } from "../../api.ts";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";

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
    <FullScreenRoute
      title="Przegląd magazynu"
      action={<Badge>{items.length}</Badge>}
    >
      <StockTable items={items} />
    </FullScreenRoute>
  );
}

function StockTable({ items }: { items: WarehouseProduct[] }) {
  const [records, setRecords] = useState(items.concat().sort(sortBy("name")));
  const [sortStatus, setSortStatus] = useState<
    DataTableSortStatus<WarehouseProduct>
  >({
    columnAccessor: "name",
    direction: "asc",
  });

  useEffect(() => {
    const data = items
      .concat()
      .sort(
        sortBy(sortStatus.columnAccessor as keyof WarehouseProduct),
      ) as WarehouseProduct[];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecords(sortStatus.direction === "desc" ? data.reverse() : data);
  }, [items, sortStatus]);

  return (
    <DataTable
      withTableBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: "name",
          title: "Produkt",
          width: "60%",
          sortable: true,
          render: (record) => (
            <Text size="xs" style={{ textWrapStyle: "balance" }}>
              {record.name}
            </Text>
          ),
        },
        {
          accessor: "currentStock",
          title: "Poziom",
          width: "20%",
          sortable: true,
          render: (record) => (
            <>
              <Text size="xs" pb={4}>
                {record.currentStock}
              </Text>
              <Progress
                value={Math.min(100, ((record.currentStock || 0) / 500) * 100)}
                size="sm"
                radius="sm"
                color={
                  (record.currentStock || 0) < 50
                    ? "red"
                    : (record.currentStock || 0) < 150
                      ? "yellow"
                      : "green"
                }
              />
            </>
          ),
        },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}

function sortBy<T>(key: keyof T) {
  return (a: T, b: T) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
}
