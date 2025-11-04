import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useCart } from "react-use-cart";

const initialState = () => ({
  id: crypto.randomUUID(),
  name: "",
  quantity: 1,
  price: 0,
});

export default function CustomOrderDialog({
  open,
  toggle,
}: {
  open: boolean;
  toggle: () => void;
}) {
  const cart = useCart();
  const [item, setItem] = useState(initialState());
  return (
    <Modal
      opened={open}
      onClose={toggle}
      title="Pozycja niestandardowa"
      centered
    >
      <Stack>
        <Text size="xs" c="dimmed">
          Pozycja niestandardowa może wymagać dodatkowej akceptacji.
        </Text>
        <TextInput
          label="Nazwa"
          required
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.currentTarget.value })}
          placeholder="Wpisz nazwę produktu"
        />
        <NumberInput
          label="Ilość"
          required
          min={1}
          value={item.quantity}
          onChange={(val) =>
            setItem({ ...item, quantity: typeof val == "number" ? val : 1 })
          }
        />
        <Group justify="flex-end">
          <Button variant="light" onClick={toggle}>
            Anuluj
          </Button>
          <Button
            disabled={item.name.trim().length === 0}
            onClick={() => {
              cart.addItem(item);
              setItem(initialState());
              toggle();
            }}
          >
            Dodaj
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
