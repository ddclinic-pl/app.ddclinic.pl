import { PatientPhotoResponse } from "../../../api-types.ts";

export default function PatientPhotos({
  photos,
}: {
  photos: PatientPhotoResponse[];
}) {
  return <div>{JSON.stringify(photos)}</div>;
}
