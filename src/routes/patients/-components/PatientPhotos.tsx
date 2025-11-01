import { useQuery } from "@tanstack/react-query";
import { getPatientPhotos } from "../../../api.ts";
import { Loader } from "@mantine/core";

export default function PatientPhotos({ id }: { id: string }) {
  const photosQuery = useQuery(getPatientPhotos(id));
  if (photosQuery.isLoading) return <Loader />;
  return <div>{JSON.stringify(photosQuery.data)}</div>;
}
