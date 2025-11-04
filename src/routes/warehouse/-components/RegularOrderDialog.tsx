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
import { useMemo, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import type { WarehouseProduct } from "../../../api-types.ts";
import { useCart } from "react-use-cart";

const MOCK_PRODUCTS: (WarehouseProduct & {
  description?: string;
  available?: number;
  availableThreshold?: number;
  thumbnail?: string;
  image?: string;
})[] = [
  {
    id: "prod-a",
    name: "Wiertło stomatologiczne",
    currentStock: 120,
    description: "Zestaw wierteł do zabiegów zachowawczych",
    available: 120,
    availableThreshold: 60,
    thumbnail: "https://placehold.co/64x64?text=A",
    image: "https://placehold.co/600x400?text=Wiertlo",
  },
  {
    id: "prod-b",
    name: "Płyn do dezynfekcji",
    currentStock: 35,
    description: "Koncentrat do dezynfekcji narzędzi",
    available: 35,
    availableThreshold: 50,
    thumbnail: "https://placehold.co/64x64?text=B",
    image: "https://placehold.co/600x400?text=Plyn",
  },
  {
    id: "prod-c",
    name: "Rękawiczki lateksowe",
    currentStock: 500,
    description: "Rozmiar M, bezpudrowe",
    available: 500,
    availableThreshold: 200,
    thumbnail: "https://placehold.co/64x64?text=C",
    image: "https://placehold.co/600x400?text=Rekawiczki",
  },
  {
    id: "prod-d",
    name: "Strzykawki",
    currentStock: 260,
    description: "Strzykawki 5ml pakowane po 100 szt",
    available: 260,
    availableThreshold: 150,
    thumbnail: "https://placehold.co/64x64?text=D",
    image: "https://placehold.co/600x400?text=Stryzkawki",
  },
];

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

  const productResults = useMemo(() => {
    if (debouncedSearch.length < 2) return [];
    const term = debouncedSearch.toLowerCase();
    return MOCK_PRODUCTS.filter((p) =>
      [p.name, p.description]
        .filter(Boolean)
        .some((v) => v!.toLowerCase().includes(term)),
    );
  }, [debouncedSearch]);

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
          {productResults.map((p) => {
            return (
              <Card key={p.id} withBorder padding="sm" radius="sm">
                <Stack gap={4}>
                  <Group justify="space-between" align="flex-start">
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {p.name}
                      </Text>
                      {p.description && (
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {p.description}
                        </Text>
                      )}
                      <Text
                        size="xs"
                        c={
                          p.available &&
                          p.available < (p.availableThreshold || 0)
                            ? "red"
                            : "dimmed"
                        }
                      >
                        {p.available} szt. w magazynie
                      </Text>
                    </Stack>
                    <Image
                      src={p.thumbnail}
                      alt={p.name}
                      radius="sm"
                      style={{
                        cursor: p.image ? "pointer" : "default",
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
          {productResults.length === 0 && debouncedSearch.length >= 2 && (
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
