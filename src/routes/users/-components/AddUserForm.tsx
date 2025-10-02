import { useForm } from "@mantine/form";
import { Button, Group, Select, Stack, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { createApplicationUser } from "../../../api.ts";
import { CreateAccountRequest } from "../../../api-types.ts";
import InternalAccountPicker from "../../../components/InternalAccountPicker.tsx";

export function AddUserForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void;
  onSubmit: () => void;
}) {
  const createAccount = useMutation(createApplicationUser());
  const form = useForm<CreateAccountRequest>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "ASSISTANT",
      referenceUserId: "",
    },

    validate: {
      role: (value) => (value ? null : "Role is required"),
      phoneNumber: (value) => (value ? null : "Phone number is required"),
      referenceUserId: (value) =>
        value ? null : "referenceUserId account is required",
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
        <InternalAccountPicker
          onChange={(account) => {
            form.setFieldValue("referenceUserId", account.id);
            form.setFieldValue("firstName", account.firstName);
            form.setFieldValue("lastName", account.lastName);
            if (account.phoneNumber) {
              form.setFieldValue("phoneNumber", account.phoneNumber);
            }
            if (account.email) {
              form.setFieldValue("email", account.email);
            }
          }}
        />
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
