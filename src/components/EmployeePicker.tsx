import { useState } from "react";
import { Combobox, Input, InputBase, Loader, useCombobox } from "@mantine/core";
// @ts-expect-error it works
import { GetInputPropsReturnType } from "@mantine/form/lib/types";

const MOCKDATA = ["Bartosz Gałek"];

function getAsyncData() {
  return Promise.resolve(MOCKDATA);
}

export function EmployeePicker({
  inputProps,
}: {
  inputProps: GetInputPropsReturnType;
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => {
      if (data.length === 0 && !loading) {
        setLoading(true);
        getAsyncData().then((response) => {
          setData(response);
          setLoading(false);
          combobox.resetSelectedOption();
        });
      }
    },
  });

  const options = data.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        inputProps.onChange(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          {...inputProps}
          component="button"
          type="button"
          pointer
          rightSection={loading ? <Loader size={18} /> : <Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          label="Pracownik"
          placeholder="Imię i nazwisko"
          withAsterisk
        >
          {inputProps.value || (
            <Input.Placeholder>Wybierz pracownika</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>
          {loading ? <Combobox.Empty>Loading....</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
