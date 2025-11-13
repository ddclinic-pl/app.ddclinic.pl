import { createFileRoute } from "@tanstack/react-router";
import { SegmentedControl, Text } from "@mantine/core";
import { useState } from "react";
import { ComputerIncidentForm } from "./-components/computers.tsx";
import { EquipmentIncidentForm } from "./-components/equipment.tsx";
import FullScreenRoute from "../../components/FullScreenRoute.tsx";

export const Route = createFileRoute("/incidents/")({
  component: IncidentsPage,
  head: () => ({
    meta: [{ title: "Awarie" }],
  }),
});

function IncidentsPage() {
  const [type, setType] = useState<"computer" | "equipment">("equipment");

  return (
    <FullScreenRoute>
      <Text size="sm" fw={500} mb={6}>
        Rodzaj incydentu
      </Text>
      <SegmentedControl
        mb="md"
        fullWidth
        value={type}
        onChange={(v) => setType(v as "computer" | "equipment")}
        data={[
          { label: "Sprzęt dentystyczny", value: "equipment" },
          { label: "Komputer", value: "computer" },
        ]}
      />
      {type === "computer" ? (
        <ComputerIncidentForm />
      ) : (
        <EquipmentIncidentForm />
      )}
    </FullScreenRoute>
  );
}
