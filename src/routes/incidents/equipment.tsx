import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

export const Route = createFileRoute("/incidents/equipment")({
  component: EquipmentIncidentForm,
  head: () => ({
    meta: [{ title: "Awarie – Sprzęt dentystyczny" }],
  }),
});

interface EquipmentIncidentValues {
  equipment: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export function EquipmentIncidentForm() {
  const form = useForm<EquipmentIncidentValues>({
    initialValues: {
      equipment: "",
      severity: "medium",
      description: "",
    },
    validate: {
      equipment: (v) => (v.trim().length === 0 ? "Sprzęt jest wymagany" : null),
      description: (v) =>
        v.trim().length === 0 ? "Opis problemu jest wymagany" : null,
    },
  });

  const onSubmit = (values: EquipmentIncidentValues) => {
    // Placeholder – integrate with API when available
    // eslint-disable-next-line no-console
    console.log("Equipment incident submitted", values);
    notifications.show({
      title: "Zgłoszenie wysłane",
      message: "Twoje zgłoszenie dotyczące sprzętu zostało zapisane.",
      color: "green",
    });
    form.reset();
  };

  return (
    <Stack>
      <Title size="xl">Zgłoszenie incydentu – Sprzęt</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Urządzenie"
            placeholder="np. Fotel stomatologiczny nr 2"
            withAsterisk
            {...form.getInputProps("equipment")}
          />
          <Select
            label="Priorytet"
            data={[
              { value: "low", label: "Niski" },
              { value: "medium", label: "Średni" },
              { value: "high", label: "Wysoki" },
            ]}
            {...form.getInputProps("severity")}
          />
          <Textarea
            label="Opis problemu"
            placeholder="Opisz szczegóły, kiedy występuje problem, komunikaty błędów itp."
            minRows={4}
            withAsterisk
            {...form.getInputProps("description")}
          />
          <Button type="submit">Wyślij zgłoszenie</Button>
        </Stack>
      </form>
    </Stack>
  );
}
