import { createFileRoute } from "@tanstack/react-router";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  NumberInput,
  ScrollArea,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCategory2, IconPlus, IconTrash } from "@tabler/icons-react";
import RegularOrderDialog from "./-components/RegularOrderDialog.tsx";
import CustomOrderDialog from "./-components/CustomOrderDialog.tsx";
import { CartProvider, useCart } from "react-use-cart";

export const Route = createFileRoute("/warehouse/new-order")({
  component: () => (
    <CartProvider>
      <NewWarehouseOrderView />
    </CartProvider>
  ),
});

function NewWarehouseOrderView() {
  const cart = useCart();
  const [regularOpen, toggleRegularDialog] = useDisclosure(false);
  const [customOpen, toggleCustomDialog] = useDisclosure(false);
  return (
    <Stack>
      <Title order={3}>Nowe zamówienie</Title>
      <Button
        justify="flex-start"
        leftSection={<IconPlus size={16} />}
        variant="light"
        h={50}
        onClick={() => {
          toggleRegularDialog.open();
        }}
      >
        Dodaj pozycję z magazynu
      </Button>
      <Button
        justify="flex-start"
        leftSection={<IconPlus size={16} />}
        variant="light"
        h={50}
        onClick={() => toggleCustomDialog.open()}
      >
        Dodaj pozycję niestandardową
      </Button>
      <Group justify="space-between">
        <Text fw={500}>Twój koszyk</Text>
        <Badge>{cart.totalItems}</Badge>
      </Group>
      {cart.totalItems === 0 && (
        <Stack align="center" py={40} gap={4}>
          <IconCategory2 size={40} stroke={1.3} />
          <Text fw={500}>Koszyk jest pusty</Text>
          <Text size="xs" c="dimmed">
            Dodaj produkt aby rozpocząć
          </Text>
        </Stack>
      )}
      {cart.totalItems > 0 && (
        <ScrollArea h="100%">
          <Stack gap="sm" flex={1}>
            {cart.items.map((item) => (
              <Card key={item.id} withBorder padding="sm" radius="sm">
                <Stack gap={6}>
                  <Group justify="space-between" align="center">
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="sm" fw={500}>
                        {item.name}
                      </Text>
                      {item.description && (
                        <Text size="xs" c="dimmed" lineClamp={2}>
                          {item.description}
                        </Text>
                      )}
                    </Stack>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => cart.removeItem(item.id)}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                  <Group align="center" gap="xs">
                    <NumberInput
                      style={{ flex: 0 }}
                      size="xs"
                      miw={50}
                      value={item.quantity}
                      min={1}
                      max={99}
                      onChange={(val) => {
                        if (typeof val === "number")
                          cart.updateItemQuantity(item.id, val);
                      }}
                    />
                    <Select
                      placeholder="Kategoria"
                      data={[
                        {
                          value: "CONSERVATIVE",
                          label: "Stomatologia zachowawcza",
                        },
                        { value: "ORTHODONTIC", label: "Ortodoncja" },
                        { value: "HYGIENE", label: "Gabinet higieny" },
                        { value: "PROSTHETICS", label: "Protetyka" },
                        { value: "SURGERY", label: "Chirurgia" },
                        { value: "PERIODONTAL", label: "Periodontologia" },
                        { value: "OPERATING_ROOM", label: "Blok operacyjny" },
                      ]}
                      style={{ flex: 1 }}
                      value={item.category}
                      onChange={console.log}
                      size="xs"
                    />
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </ScrollArea>
      )}
      <Group justify="flex-end">
        <Button fullWidth disabled={!cart.totalItems} onClick={submitOrder}>
          Wyślij zamówienie
        </Button>
      </Group>
      <RegularOrderDialog
        open={regularOpen}
        toggle={toggleRegularDialog.toggle}
      />
      <CustomOrderDialog open={customOpen} toggle={toggleCustomDialog.toggle} />
    </Stack>
  );
}

function submitOrder() {
  console.log("ordered!");
}
