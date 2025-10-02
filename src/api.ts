import { mutationOptions, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
  ApplicationUserResponse,
  Appointment,
  CreateAccountRequest,
  InternalUserResponse,
  Patient,
  PatientSearchResultItemResponse,
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
    queryFn: async (): Promise<ApplicationUserResponse[]> => {
      return await axios
        .get<ApplicationUserResponse[]>(`/users`)
        .then((response) => response.data);
    },
  });

export const createApplicationUser = () =>
  mutationOptions({
    mutationFn: async (createUserRequest: CreateAccountRequest) => {
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

export const getInternalUsers = () =>
  queryOptions({
    queryKey: ["internal", "users"],
    staleTime: 0,
    retryOnMount: true,
    queryFn: async (): Promise<InternalUserResponse[]> => {
      return await axios
        .get<InternalUserResponse[]>(`/internal/users`)
        .then((response) => response.data);
    },
  });

export const getPatients = (query: string) =>
  queryOptions({
    queryKey: ["patients", query],
    staleTime: 0,
    retryOnMount: true,
    enabled: !!query && query.length > 2,
    queryFn: async (): Promise<PatientSearchResultItemResponse[]> => {
      return await axios
        .get<
          PatientSearchResultItemResponse[]
        >(`/patients?query=${encodeURIComponent(query)}`)
        .then((response) => response.data);
    },
  });

export const getPatient = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id],
    staleTime: 0,
    retryOnMount: true,
    enabled: !!id,
    queryFn: async (): Promise<Patient> => {
      return await axios
        .get<Patient>(`/patients/${encodeURIComponent(id!)}`)
        .then((response) => response.data);
    },
  });
