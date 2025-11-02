import { PatientFileResponse } from "../../../api-types.ts";

export default function PatientFiles({
  files,
}: {
  files: PatientFileResponse[];
}) {
  return <div>{JSON.stringify(files)}</div>;
}
