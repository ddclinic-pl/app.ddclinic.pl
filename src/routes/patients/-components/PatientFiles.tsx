import { useQuery } from "@tanstack/react-query";
import { getPatientFiles } from "../../../api.ts";
import { Loader } from "@mantine/core";

export default function PatientFiles({ id }: { id: string }) {
  const photosQuery = useQuery(getPatientFiles(id));
  if (photosQuery.isLoading) return <Loader />;
  return <div>{JSON.stringify(photosQuery.data)}</div>;
}
