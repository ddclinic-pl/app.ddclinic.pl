import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import {
  Alert,
  Box,
  Button,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconInfoCircle } from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { EmployeePicker } from "../components/EmployeePicker.tsx";

export const Route = createFileRoute("/vacation")({
  component: VacationRequestForm,
});

interface FormValues {
  employee: string;
  vacationType: string;
  date: [Date | null, Date | null];
  substitute: string;
  comment: string;
}

function VacationRequestForm() {
  const [selectedDays, setSelectedDays] = useState(1);

  const form = useForm<FormValues>({
    initialValues: {
      employee: "",
      vacationType: "wypoczynkowy",
      date: [new Date(), null],
      substitute: "",
      comment: "",
    },
    validate: {
      employee: (value) =>
        value.trim().length === 0 ? "To pole jest wymagane" : null,
      vacationType: (value) =>
        value.trim().length === 0 ? "To pole jest wymagane" : null,
      date: (value) => {
        return value[0] === null || value[1] === null
          ? "To pole jest wymagane"
          : null;
      },
      substitute: (value) =>
        value.trim().length === 0 ? "To pole jest wymagane" : null,
    },
  });

  const calculateDays = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 1;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const { date } = form.values;
    if (date[0] && date[1]) {
      setSelectedDays(calculateDays(date[0], date[1]));
    }
  }, [form.values]);

  const onSubmit = (values: FormValues) => {
    console.log("Form submitted:", values);
  };

  return (
    <Stack h="100%" justify="space-between">
      <Box>
        <Title order={3}>Twój stan urlopowy</Title>
        <Text size="md" mt={5}>
          Do wykorzystania masz jeszcze: <strong>26 dni</strong> urlopu
        </Text>
      </Box>
      <Box>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <EmployeePicker
              inputProps={{ ...form.getInputProps("employee") }}
            />
            <Select
              label="Rodzaj urlopu"
              placeholder="Wybierz rodzaj urlopu"
              withAsterisk
              data={[
                { value: "wypoczynkowy", label: "wypoczynkowy" },
                { value: "okolicznościowy", label: "okolicznościowy" },
                { value: "na żądanie", label: "na żądanie" },
                { value: "bezpłatny", label: "bezpłatny" },
              ]}
              {...form.getInputProps("vacationType")}
            />
            <Box>
              <Text size="sm" fw={500} mb={3}>
                Data rozpoczęcia urlopu
                {form.errors.startDate && (
                  <Text span c="red" size="xs" ml={5}>
                    {form.errors.startDate}
                  </Text>
                )}
              </Text>
              <DatePickerInput
                value={form.values.date}
                firstDayOfWeek={1}
                weekendDays={[0, 6]}
                size="sm"
                type="range"
                {...form.getInputProps("date")}
              />
            </Box>
            <TextInput
              label="Osoba zastępująca"
              placeholder="Imię Nazwisko"
              withAsterisk
              {...form.getInputProps("substitute")}
            />
            <Textarea
              label="Komentarz"
              placeholder="Dodatkowe informacje"
              {...form.getInputProps("comment")}
            />
            <Alert icon={<IconInfoCircle size={16} />} variant="light">
              <Text size="sm">
                Wybrana liczba dni na urlopie: {selectedDays}
              </Text>
            </Alert>
            <Alert icon={<IconInfoCircle size={16} />} variant="light">
              <Text size="sm">
                Dni wolne od pracy: 1 stycznia, 6 stycznia, 20 kwietnia, 21
                kwietnia, 1 maja, 3 maja, 26 maja, 8 czerwca, 19 czerwca, 15
                sierpnia, 1 listopada, 11 listopada, 25 grudnia, 26 grudnia
              </Text>
            </Alert>
            <Button fullWidth size="md" type="submit">
              WYŚLIJ
            </Button>
          </Stack>
        </form>
      </Box>
    </Stack>
  );
}
