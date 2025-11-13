import { createFileRoute } from "@tanstack/react-router";
import { Badge, Paper, Stack, Text } from "@mantine/core";
import { IconTruckDelivery } from "@tabler/icons-react";
import { queryClient } from "../../queryClient.ts";
import { getUserWarehouseOrders } from "../../api.ts";
import { OrderCard } from "./-components/OrderCard.tsx";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";

export const Route = createFileRoute("/warehouse/orders")({
  component: MyWarehouseOrdersView,
  loader: () => queryClient.ensureQueryData(getUserWarehouseOrders()),
  head: () => ({
    meta: [{ title: "Magazyn: Moje zamówienia" }],
  }),
});

function MyWarehouseOrdersView() {
  const orders = Route.useLoaderData();
  return (
    <FullScreenRoute
      title="Moje zamówienia"
      action={<Badge>{orders.length}</Badge>}
    >
      <Stack>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <Paper withBorder p="md" radius="md">
            <Stack align="center" gap="xs">
              <IconTruckDelivery size={36} stroke={1.5} />
              <Text size="sm" c="dimmed">
                Brak zamówień.
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </FullScreenRoute>
  );
}
