import { queryOptions } from "@tanstack/react-query";
import * as axios from "axios";

export interface Appointment {
  date: string;
  startTime: string;
  endTime: string;
  notes: string;
  patient?: {
    firstName: string;
    lastName: string;
  };
}

export const appointmentsQueryOptions = (date: string) =>
  queryOptions({
    queryKey: ["appointments"],
    queryFn: async (): Promise<Appointment[]> => {
      try {
        const response = await axios.default.get<Appointment[]>(
          `/appointments?date=${date}`,
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch posts");
      }
    },
  });
