import { createFileRoute } from "@tanstack/react-router";
import { Box, SegmentedControl, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { ComputerIncidentForm } from "./computers.tsx";
import { EquipmentIncidentForm } from "./equipment.tsx";

export const Route = createFileRoute("/incidents/")({
  component: IncidentsPage,
  head: () => ({
    meta: [{ title: "Awarie" }],
  }),
});

function IncidentsPage() {
  const [type, setType] = useState<"computer" | "equipment">("equipment");

  return (
    <Stack>
      <Title size="xl">Awarie</Title>
      <Box>
        <Text size="sm" fw={500} mb={6}>
          Rodzaj incydentu
        </Text>
        <SegmentedControl
          fullWidth
          value={type}
          onChange={(v) => setType(v as "computer" | "equipment")}
          data={[
            { label: "Sprzęt dentystyczny", value: "equipment" },
            { label: "Komputer", value: "computer" },
          ]}
        />
      </Box>

      {type === "computer" ? (
        <ComputerIncidentForm />
      ) : (
        <EquipmentIncidentForm />
      )}
    </Stack>
  );
}
