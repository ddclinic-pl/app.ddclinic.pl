import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Box, Input, ScrollArea, Stack, Title } from "@mantine/core";
import { getPatients } from "../../api.ts";
import { useDebouncedCallback } from "@mantine/hooks";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient.ts";
import { useState } from "react";
import { PatientSearchResults } from "./-components/PatientSearchResults.tsx";

export const Route = createFileRoute("/patients/")({
  component: PatientsBrowse,
  validateSearch: (search) => ({
    query: undefined as string | undefined,
    ...search,
  }),
  loaderDeps: (context) => ({ query: context.search.query }),
  loader: (context) =>
    queryClient.ensureQueryData(getPatients(context.deps.query)),
  head: () => ({
    meta: [{ title: "Pacjenci" }],
  }),
});

function PatientsBrowse() {
  const { query } = Route.useSearch();
  const [value, setValue] = useState(query);
  const navigate = useNavigate({ from: Route.fullPath });
  const handleSearch = useDebouncedCallback(async (query) => {
    if (query.length === 0) {
      return navigate({
        search: (prev) => ({ ...prev, query: undefined }),
      });
    }
    return navigate({
      search: (prev) => ({ ...prev, query }),
    });
  }, 400);
  const patientsQuery = useSuspenseQuery(getPatients(query));
  return (
    <Stack gap="md">
      <Box
        style={{
          position: "sticky",
          top: 60,
          zIndex: 100,
          background: "var(--mantine-color-body)",
          margin: -16,
          padding: 16,
          marginTop: -16,
          paddingBottom: 24,
        }}
      >
        <Stack gap="sm">
          <Title size="xl">Wyszukaj pacjenta</Title>
          <Input
            autoFocus
            placeholder="Jan Kowalski"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </Stack>
      </Box>
      <ScrollArea h="100%">
        <PatientSearchResults
          query={query}
          isLoading={patientsQuery.isLoading}
          patients={patientsQuery.data}
        />
      </ScrollArea>
    </Stack>
  );
}
