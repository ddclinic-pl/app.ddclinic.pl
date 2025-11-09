import { createFileRoute, redirect } from "@tanstack/react-router";
import dayjs from "dayjs";

export const Route = createFileRoute("/")({
  loader: () => {
    redirect({
      search: { date: dayjs().format("YYYY-MM-DD") },
      to: "/appointments",
      throw: true,
    });
  },
});
