import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../api.ts";
import { Autocomplete, Loader, Stack, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { Patient } from "../api-types.ts";

export default function PatientPicker({
  initial,
  onSelect,
}: {
  initial?: Patient;
  onSelect?: (id: string) => void;
}) {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);
  const patientsQuery = useQuery(getPatients(debounced));
  const options = useMemo(
    () =>
      (patientsQuery.data || []).map((patient) => ({
        value: patient.id,
        label: patient.displayName,
        phoneNumber: patient.phoneNumber,
      })),
    [patientsQuery.data],
  );

  useEffect(() => {
    if (initial) setValue(initial?.displayName || "");
  }, [initial]);

  return (
    <Autocomplete
      placeholder="Jan Kowalski"
      data={options}
      rightSection={patientsQuery.isLoading ? <Loader size={16} /> : null}
      // @ts-expect-error "added phone"
      renderOption={renderAutocompleteOption}
      value={value}
      onChange={(value) => setValue(value)}
      onOptionSubmit={onSelect}
    />
  );
}

function renderAutocompleteOption({
  option,
}: {
  option: { label: string; phoneNumber: string };
}) {
  return (
    <Stack gap={1}>
      <Text size="sm">{option.label}</Text>
      <Text size="xs" opacity={0.5}>
        {option.phoneNumber}
      </Text>
    </Stack>
  );
}
