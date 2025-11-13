import {
  ActionIcon,
  Card,
  Group,
  Image,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useCart } from "react-use-cart";
import { useQuery } from "@tanstack/react-query";
import { getWarehouseSummary } from "../../../api.ts";

export default function RegularOrderDialog({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  const cart = useCart();
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 200);
  const productsQuery = useQuery(getWarehouseSummary());
  if (productsQuery.isLoading || !productsQuery.data) return null;

  return (
    <Modal opened={open} onClose={toggle} fullScreen title="Wybierz produkt">
      <Stack>
        <TextInput
          leftSection={<IconSearch size={14} />}
          placeholder="Szukaj... (min 2 znaki)"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          style={{ flex: 1 }}
        />
        <SimpleGrid spacing="md">
          {productsQuery.data.map((p) => {
            return (
              <Card key={p.id} withBorder padding="sm" radius="sm">
                <Stack gap={4}>
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {p.name}
                      </Text>
                      {p.name && (
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {p.name}
                        </Text>
                      )}
                      <Text
                        size="xs"
                        c={
                          p.currentStock &&
                          p.currentStock < (p.currentStock || 0)
                            ? "red"
                            : "dimmed"
                        }
                      >
                        {p.currentStock} szt. w magazynie
                      </Text>
                    </Stack>
                    <Image
                      src={p.photoUrl}
                      alt={p.name}
                      radius="sm"
                      style={{
                        cursor: p.photoUrl ? "pointer" : "default",
                      }}
                      w={48}
                      h={48}
                      onClick={console.log}
                    />
                  </Group>
                  <Group gap={4}>
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      onClick={() => {
                        if (cart.inCart(p.id)) {
                          const quantity = cart.getItem(p.id).quantity;
                          cart.updateItemQuantity(p.id, quantity - 1);
                        } else cart.addItem({ price: 0, ...p });
                      }}
                    >
                      <IconMinus size={12} />
                    </ActionIcon>
                    <Text size="xs">{cart.getItem(p.id)?.quantity || 0}</Text>
                    <ActionIcon
                      size="sm"
                      variant="subtle"
                      onClick={() => {
                        if (cart.inCart(p.id)) {
                          const quantity = cart.getItem(p.id).quantity;
                          cart.updateItemQuantity(p.id, quantity + 1);
                        } else cart.addItem({ price: 0, ...p });
                      }}
                    >
                      <IconPlus size={12} />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Card>
            );
          })}
          {productsQuery.data.length === 0 && debouncedSearch.length >= 2 && (
            <Card withBorder padding="lg" radius="md">
              <Text size="sm" c="dimmed">
                Brak wyników dla "{debouncedSearch}"
              </Text>
            </Card>
          )}
        </SimpleGrid>
      </Stack>
    </Modal>
  );
}
