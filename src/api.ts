import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { Appointment, User } from "./api-types.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_DDCLINIC;

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await window.Clerk.session.getToken({ template: "api-ddclinic-pl" })}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    notifications.show({
      title: "Błąd",
      message: "Nie udało się pobrać danych",
      color: "red",
    });
    return Promise.reject(error);
  },
);

export const getAppointments = (date: string) =>
  queryOptions({
    queryKey: ["appointments"],
    queryFn: async (): Promise<Appointment[]> => {
      return await axios
        .get<Appointment[]>(`/appointments?date=${date}`)
        .then((response) => response.data);
    },
  });

export const getUsers = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async (): Promise<User[]> => {
      return await axios
        .get<User[]>(`/users`)
        .then((response) => response.data);
    },
  });
