import { useForm } from "@mantine/form";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { createApplicationUser, getPlmedUsers } from "../../api.ts";
import { useMemo } from "react";
import { CreateUserRequest } from "../../api-types.ts";

export function AddUserForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const plMedUsers = useSuspenseQuery(getPlmedUsers());
  const createAccount = useMutation(createApplicationUser());

  const plmedidOptions = useMemo(
    () =>
      plMedUsers.data.map((user) => ({
        value: user.id,
        label: user.displayName,
      })),
    [plMedUsers.data],
  );

  const form = useForm<CreateUserRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "ASSISTANT",
      plmedId: "",
    },

    validate: {
      role: (value) => (value ? null : "Role is required"),
      phoneNumber: (value) => (value ? null : "Phone number is required"),
      plmedId: (value) => (value ? null : "PLMED account is required"),
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    createAccount.mutate(values, {
      onSuccess: () => {
        onSubmit();
        form.reset();
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Imię"
          placeholder="Jan"
          {...form.getInputProps("firstName")}
          required
        />
        <TextInput
          label="Nazwisko"
          placeholder="Kowalski"
          {...form.getInputProps("lastName")}
          required
        />
        <TextInput
          label="E-mail"
          type="email"
          placeholder="jan.kowalski@ddclinic.pl"
          {...form.getInputProps("email")}
          required
        />
        <TextInput
          label="Numer telefonu"
          type="tel"
          pattern="(\+\d+ ?)?[0-9]{3} ?[0-9]{3} ?[0-9]{3}"
          placeholder="+48 123 123 456"
          autoComplete="home tel"
          {...form.getInputProps("phoneNumber")}
          required
        />
        <Select
          label="Rola w aplikacji"
          data={[
            { value: "ADMIN", label: "Administrator" },
            { value: "ASSISTANT", label: "Asysta" },
            { value: "DOCTOR", label: "Lekarz" },
            {
              value: "RECEPTIONIST",
              label: "Recepcja",
            },
          ]}
          placeholder="Wybierz rolę"
          {...form.getInputProps("role")}
          required
        />
        <Select
          label="Konto PLMed"
          data={plmedidOptions}
          placeholder="Wybierz konto PLMed"
          {...form.getInputProps("plmedId")}
          required
        />
        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onCancel}>
            Anuluj
          </Button>
          <Button type="submit" disabled={!form.isValid()}>
            Utwórz
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
