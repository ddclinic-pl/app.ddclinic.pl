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

export const Route = createFileRoute("/incidents/computers")({
  component: ComputerIncidentForm,
  head: () => ({
    meta: [{ title: "Awarie – Komputery" }],
  }),
});

interface ComputerIncidentValues {
  title: string;
  device: string;
  severity: "low" | "medium" | "high";
  description: string;
}

export function ComputerIncidentForm() {
  const form = useForm<ComputerIncidentValues>({
    initialValues: {
      title: "",
      device: "",
      severity: "medium",
      description: "",
    },
    validate: {
      title: (v) => (v.trim().length === 0 ? "Tytuł jest wymagany" : null),
      device: (v) =>
        v.trim().length === 0 ? "Urządzenie jest wymagane" : null,
      description: (v) =>
        v.trim().length === 0 ? "Opis problemu jest wymagany" : null,
    },
  });

  const onSubmit = (values: ComputerIncidentValues) => {
    // Placeholder – integrate with API when available
    // eslint-disable-next-line no-console
    console.log("Computer incident submitted", values);
    notifications.show({
      title: "Zgłoszenie wysłane",
      message: "Twoje zgłoszenie dotyczące komputera zostało zapisane.",
      color: "green",
    });
    form.reset();
  };

  return (
    <Stack>
      <Title size="xl">Zgłoszenie incydentu – Komputer</Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack>
          <TextInput
            label="Tytuł"
            placeholder="Krótki opis problemu"
            withAsterisk
            {...form.getInputProps("title")}
          />
          <TextInput
            label="Urządzenie / Nazwa komputera"
            placeholder="np. PC-REJ-01"
            withAsterisk
            {...form.getInputProps("device")}
          />
          <Select
            label="Ważność"
            data={[
              { value: "low", label: "Niska" },
              { value: "medium", label: "Średnia" },
              { value: "high", label: "Wysoka" },
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
