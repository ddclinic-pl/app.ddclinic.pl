import { Loader, Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getInternalUsers } from "../api.ts";
import { InternalUserResponse } from "../api-types.ts";

export default function InternalAccountPicker({
  onChange,
}: {
  onChange: (value: InternalUserResponse) => void;
}) {
  const internalUsers = useQuery(getInternalUsers());
  return (
    <Select
      label="Konto PLMed"
      data={(internalUsers.data || []).map((user) => ({
        value: user.id,
        label: `${user.displayName} (${user.account})`,
      }))}
      placeholder="Wybierz konto PLMed"
      onChange={(value) => {
        const account = internalUsers.data?.find((it) => it.id === value);
        if (account) onChange(account);
      }}
      rightSection={internalUsers.isLoading ? <Loader size={16} /> : null}
      required
    />
  );
}
