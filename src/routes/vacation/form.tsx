import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  Alert,
  Anchor,
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconInfoCircle } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addLeave, getLeaveTypes } from "../../api.ts";
import type { LeaveToAddRequest } from "../../api-types.ts";
import dayjs from "dayjs";

export const Route = createFileRoute("/vacation/form")({
  component: VacationRequestForm,
});

interface FormValues {
  type: LeaveToAddRequest["type"];
  date: [string | null, string | null];
  substitute: string;
  comment: string;
}

function VacationRequestForm() {
  const [selectedDays, setSelectedDays] = useState(1);
  const leaveTypesQuery = useQuery(getLeaveTypes());
  const addLeaveMutation = useMutation(addLeave());

  const form = useForm<FormValues>({
    initialValues: {
      type: "VACATION",
      date: [new Date().toDateString(), null],
      substitute: "",
      comment: "",
    },
    validate: {
      type: (value) =>
        value.trim().length === 0 ? "To pole jest wymagane" : null,
      date: (value) => {
        return value[0] === null || value[1] === null
          ? "To pole jest wymagane"
          : null;
      },
    },
  });

  const calculateDays = (start: string | null, end: string | null) => {
    if (!start || !end) return 1;
    return dayjs(end).diff(dayjs(start), "days") + 1;
  };

  const onSubmit = (values: FormValues) => {
    const [from, to] = values.date;
    if (!from || !to) return;
    addLeaveMutation.mutate(
      {
        type: values.type,
        dateFrom: from,
        dateTo: to,
        deputy: values.substitute || undefined,
        comment: values.comment || undefined,
      },
      {
        onSuccess: async () => {
          form.reset();
          setSelectedDays(1);
        },
      },
    );
  };

  return (
    <form style={{ height: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
      <Stack justify="space-between">
        <Box>
          <Title order={3}>Twój stan urlopowy</Title>
          <Text size="md" mt={5}>
            Do wykorzystania masz jeszcze: <strong>26 dni</strong> urlopu
          </Text>
        </Box>
        <Stack>
          <Select
            label="Rodzaj urlopu"
            placeholder={
              leaveTypesQuery.isLoading
                ? "Ładowanie..."
                : "Wybierz rodzaj urlopu"
            }
            withAsterisk
            data={(leaveTypesQuery.data || []).map((type) => ({
              value: type.id,
              label: type.label,
            }))}
            disabled={leaveTypesQuery.isLoading}
            {...form.getInputProps("vacationType")}
          />
          <Box>
            <Text size="sm" fw={500} mb={3}>
              Data urlopu
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
              allowSingleDateInRange
              type="range"
              {...form.getInputProps("date")}
              onChange={([start, end]) => {
                form.setFieldValue("date", [start, end]);
                if (start && end) {
                  setSelectedDays(calculateDays(start, end));
                }
              }}
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
            <Text size="sm">Wybrana liczba dni na urlopie: {selectedDays}</Text>
          </Alert>
          <Alert icon={<IconInfoCircle size={16} />} variant="light">
            <Text size="sm">
              Dni wolne od pracy: 1 stycznia, 6 stycznia, 20 kwietnia, 21
              kwietnia, 1 maja, 3 maja, 26 maja, 8 czerwca, 19 czerwca, 15
              sierpnia, 1 listopada, 11 listopada, 25 grudnia, 26 grudnia
            </Text>
          </Alert>
        </Stack>
        <Group gap="md" mt="xs">
          <Anchor component={Link} to="/vacation/my">
            Moje wnioski
          </Anchor>
          <Anchor component={Link} to="/vacation/employees">
            Wnioski pracowników
          </Anchor>
        </Group>
        <Button
          fullWidth
          type="submit"
          loading={addLeaveMutation.isPending}
          disabled={!form.isValid()}
        >
          Wyślij
        </Button>
      </Stack>
    </form>
  );
}
