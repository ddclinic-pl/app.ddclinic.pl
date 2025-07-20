import { mutationOptions, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
  ApplicationUser,
  Appointment,
  CreateUserRequest,
  PlmedUser,
} from "./api-types.ts";

axios.defaults.baseURL = import.meta.env.VITE_API_DDCLINIC;

axios.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${await window.Clerk.session.getToken({ template: "api-ddclinic-pl" })}`;
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    notifications.show({
      title: "Błąd",
      message: error.response?.data?.error || "Wystąpił nieznany błąd.",
      color: "red",
    });
    return Promise.reject(error);
  },
);

export const getAppointments = (date: string) =>
  queryOptions({
    queryKey: ["appointments", date],
    queryFn: async (): Promise<Appointment[]> => {
      return await axios
        .get<Appointment[]>(`/appointments?date=${date}`)
        .then((response) => response.data);
    },
  });

export const getUsers = () =>
  queryOptions({
    queryKey: ["users"],
    staleTime: 0,
    retryOnMount: true,
    queryFn: async (): Promise<ApplicationUser[]> => {
      return await axios
        .get<ApplicationUser[]>(`/users`)
        .then((response) => response.data);
    },
  });

export const createApplicationUser = () =>
  mutationOptions({
    mutationFn: async (createUserRequest: CreateUserRequest) => {
      await axios.post(`/users`, createUserRequest);
    },
    onSuccess: () => {
      notifications.show({
        title: "Użytkownik dodany",
        message: "Użytkownik został pomyślnie dodany.",
        color: "green",
      });
    },
  });

export const getPlmedUsers = () =>
  queryOptions({
    queryKey: ["plmed", "users"],
    staleTime: 0,
    retryOnMount: true,
    queryFn: async (): Promise<PlmedUser[]> => {
      return await axios
        .get<PlmedUser[]>(`/plmed/users`)
        .then((response) => response.data);
    },
  });
