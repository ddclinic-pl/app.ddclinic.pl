import type { WarehouseOrder } from "../../../api-types.ts";
import { Badge, Blockquote, Card, Group, Stack, Text } from "@mantine/core";

export function OrderCard({ order }: { order: WarehouseOrder }) {
  return (
    <Card withBorder>
      <Stack>
        <Group justify="space-between">
          <Stack gap={4} justify="center">
            <Text fw={500}>Zamówienie #{order.id}</Text>
            <Text size="xs" c="dimmed">
              Utworzono:{" "}
              {new Date(order.createdAt).toLocaleString("pl-PL", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </Text>
          </Stack>
          <StatusBadge status={order.status} />
        </Group>
        <Stack gap={4}>
          {order.items.map((item) => (
            <Text size="sm" key={item.productId}>
              • {item.productName} – {item.quantity} szt.
            </Text>
          ))}
        </Stack>
        {order.comment && (
          <Blockquote color="blue" p="sm">
            <Text size="sm" c="dimmed">
              {order.comment}
            </Text>
          </Blockquote>
        )}
      </Stack>
    </Card>
  );
}

function StatusBadge({ status }: { status: WarehouseOrder["status"] }) {
  switch (status) {
    case "PENDING":
      return <Badge color="blue">Złożone</Badge>;
    case "ORDERED":
      return <Badge color="lime">Zamówione</Badge>;
    case "DELIVERED":
      return <Badge color="green">Dostarczone</Badge>;
    case "CANCELLED":
      return <Badge color="red">Odrzucone</Badge>;
    default:
      return <Badge color="grey">UNKNOWN</Badge>;
  }
}
