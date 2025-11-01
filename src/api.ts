import { mutationOptions, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
  ApplicationUserResponse,
  Appointment,
  CreateAccountRequest,
  InternalUserResponse,
  PatientResponse,
  PatientSearchResultItemResponse,
} from "./api-types.ts";
import { queryClient } from "./queryClient.ts";

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

export const getMyAppointments = (date: string) =>
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
    queryFn: async (): Promise<InternalUserResponse[]> => {
      return await axios
        .get<InternalUserResponse[]>(`/internal/users`)
        .then((response) => response.data);
    },
  });

export const getPatients = (query: string = "") => {
  return queryOptions({
    queryKey: ["patients", query],
    enabled: !!query && query.length > 2,
    queryFn: async (): Promise<PatientSearchResultItemResponse[]> => {
      const results = await axios
        .get<
          PatientSearchResultItemResponse[]
        >(`/patients?query=${encodeURIComponent(query)}`)
        .then((response) => response.data);
      results.forEach((patient) => {
        queryClient.setQueryData(["patient", patient.id], patient);
      });
      return results;
    },
  });
};

export const getPatient = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id],
    enabled: !!id,
    queryFn: async (): Promise<PatientResponse> => {
      return await axios
        .get<PatientResponse>(`/patients/${encodeURIComponent(id!)}`)
        .then((response) => response.data);
    },
  });

export const getPatientAppointments = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id, "appointments"],
    enabled: !!id,
    queryFn: async (): Promise<Appointment[]> => {
      return await axios
        .get<
          Appointment[]
        >(`/appointments?patientId=${encodeURIComponent(id!)}`)
        .then((response) => response.data);
    },
  });

export const getPatientPhotos = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id, "photos"],
    enabled: !!id,
    queryFn: async (): Promise<PatientResponse> => {
      return await axios
        .get<PatientResponse>(`/patients/${encodeURIComponent(id!)}/photos`)
        .then((response) => response.data);
    },
  });

export const getPatientFiles = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id, "files"],
    enabled: !!id,
    queryFn: async (): Promise<PatientResponse> => {
      return await axios
        .get<PatientResponse>(`/patients/${encodeURIComponent(id!)}/files`)
        .then((response) => response.data);
    },
  });
