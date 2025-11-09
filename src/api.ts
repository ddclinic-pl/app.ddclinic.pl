import { mutationOptions, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import {
  ApplicationUserResponse,
  AppointmentResponse,
  AttendanceLogResponse,
  CreateAccountRequest,
  CreateOrderRequest,
  CreateTodoRequest,
  DisableUserRequest,
  InternalUserResponse,
  LeaveResponse,
  LeaveStatusUpdateRequest,
  LeaveToAddRequest,
  LeaveTypeResponse,
  ManualAttendanceRequest,
  PatientAppointmentResponse,
  PatientFileResponse,
  PatientPhotoResponse,
  PatientResponse,
  PatientSearchResultItemResponse,
  RfidAttendanceRequest,
  Todo,
  TreatmentPlanResponse,
  UpdateManagerRequest,
  UpdateOrderStatusRequest,
  UpdateTodoStatusRequest,
  WarehouseOrder,
  WarehouseProduct,
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
    queryFn: async (): Promise<AppointmentResponse[]> => {
      return await axios
        .get<AppointmentResponse[]>(`/appointments?date=${date}`)
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
    queryFn: async (): Promise<PatientAppointmentResponse[]> => {
      return await axios
        .get<
          PatientAppointmentResponse[]
        >(`/patients/${encodeURIComponent(id!)}/appointments`)
        .then((response) => response.data);
    },
  });

export const getPatientPhotos = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id, "photos"],
    enabled: !!id,
    queryFn: async (): Promise<PatientPhotoResponse[]> => {
      return await axios
        .get<
          PatientPhotoResponse[]
        >(`/patients/${encodeURIComponent(id!)}/photos`)
        .then((response) => response.data);
    },
  });

export const getPatientFiles = (id: string | null) =>
  queryOptions({
    queryKey: ["patient", id, "files"],
    enabled: !!id,
    queryFn: async (): Promise<PatientFileResponse[]> => {
      return await axios
        .get<
          PatientFileResponse[]
        >(`/patients/${encodeURIComponent(id!)}/files`)
        .then((response) => response.data);
    },
  });

export const getWarehouseSummary = () =>
  queryOptions({
    queryKey: ["warehouse", "summary"],
    queryFn: async (): Promise<WarehouseProduct[]> => {
      return Promise.resolve([
        { id: "prod-a", name: "Wiertło stomatologiczne", currentStock: 120 },
        { id: "prod-b", name: "Płyn do dezynfekcji", currentStock: 35 },
        { id: "prod-c", name: "Rękawiczki lateksowe", currentStock: 500 },
        { id: "prod-d", name: "Strzykawki", currentStock: 260 },
      ]);
      // return await axios
      //   .get<WarehouseProduct[]>(`/warehouse/products`)
      //   .then((response) => response.data);
    },
  });

export const getUserWarehouseOrders = () =>
  queryOptions({
    queryKey: ["warehouse", "orders"],
    queryFn: async (): Promise<WarehouseOrder[]> => {
      return Promise.resolve([
        {
          id: "2141",
          comment: "Pilne przed zabiegiem w piątek",
          createdAt: new Date().toISOString(),
          items: [
            {
              productId: "prod-a",
              productName: "Wiertło stomatologiczne",
              quantity: 5,
            },
            {
              productId: "prod-b",
              productName: "Płyn do dezynfekcji",
              quantity: 2,
            },
          ],
          status: "PENDING",
          userId: "me",
        },
        {
          id: "214132",
          comment: "Uzupełnienie zapasów",
          createdAt: new Date().toISOString(),
          items: [
            {
              productId: "prod-c",
              productName: "Rękawiczki lateksowe",
              quantity: 200,
            },
          ],
          status: "ORDERED",
          userId: "me",
        },
        {
          id: "32141",
          comment: "",
          createdAt: new Date().toISOString(),
          items: [
            { productId: "prod-d", productName: "Strzykawki", quantity: 150 },
          ],
          status: "DELIVERED",
          userId: "me",
        },
      ]);
      // return await axios
      //   .get<WarehouseProduct[]>(`/warehouse/products`)
      //   .then((response) => response.data);
    },
  });

// Warehouse Orders
export const getAllWarehouseOrders = (status?: string) =>
  queryOptions({
    queryKey: ["warehouse", "orders", status],
    queryFn: async (): Promise<WarehouseOrder[]> => {
      const params = status ? `?status=${status}` : "";
      return await axios
        .get<WarehouseOrder[]>(`/warehouse/orders${params}`)
        .then((r) => r.data);
    },
  });

export const createWarehouseOrder = () =>
  mutationOptions({
    mutationFn: async (data: CreateOrderRequest) => {
      return await axios
        .post<WarehouseOrder>(`/warehouse/orders`, data)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Zamówienie utworzone",
        message: "Zamówienie magazynowe zostało pomyślnie utworzone.",
        color: "green",
      });
    },
  });

export const getWarehouseOrder = (id: string) =>
  queryOptions({
    queryKey: ["warehouse", "order", id],
    enabled: !!id,
    queryFn: async (): Promise<WarehouseOrder> => {
      return await axios
        .get<WarehouseOrder>(`/warehouse/orders/${id}`)
        .then((r) => r.data);
    },
  });

export const updateWarehouseOrderStatus = () =>
  mutationOptions({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateOrderStatusRequest;
    }) => {
      return await axios
        .patch<WarehouseOrder>(`/warehouse/orders/${id}/status`, data)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Status zamówienia zaktualizowany",
        message: "Status zamówienia został pomyślnie zmieniony.",
        color: "green",
      });
    },
  });

export const markWarehouseOrderItemDelivered = () =>
  mutationOptions({
    mutationFn: async ({
      id,
      productId,
    }: {
      id: string;
      productId: string;
    }) => {
      return await axios
        .patch<WarehouseOrder>(
          `/warehouse/orders/${id}/items/${productId}/deliver`,
        )
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Produkt oznaczony jako dostarczony",
        message: "Produkt w zamówieniu został oznaczony jako dostarczony.",
        color: "green",
      });
    },
  });

export const cancelWarehouseOrder = () =>
  mutationOptions({
    mutationFn: async (id: string) => {
      return await axios
        .patch<WarehouseOrder>(`/warehouse/orders/${id}/cancel`)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Zamówienie anulowane",
        message: "Zamówienie magazynowe zostało pomyślnie anulowane.",
        color: "green",
      });
    },
  });

export const getAllTodos = (params?: {
  userId?: string;
  role?: string;
  patientId?: number;
  status?: string;
}) =>
  queryOptions({
    queryKey: ["todos", params],
    queryFn: async (): Promise<Todo[]> => {
      const searchParams = new URLSearchParams();
      if (params?.userId) searchParams.append("userId", params.userId);
      if (params?.role) searchParams.append("role", params.role);
      if (params?.patientId !== undefined)
        searchParams.append("patientId", String(params.patientId));
      if (params?.status) searchParams.append("status", params.status);
      const query = searchParams.toString();
      return await axios
        .get<Todo[]>(`/todos${query ? `?${query}` : ""}`)
        .then((r) => r.data);
    },
  });

export const createTodo = () =>
  mutationOptions({
    mutationFn: async (data: CreateTodoRequest) => {
      return await axios.post<Todo>(`/todos`, data).then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Zadanie utworzone",
        message: "Zadanie zostało pomyślnie utworzone.",
        color: "green",
      });
    },
  });

export const getTodo = (id: string) =>
  queryOptions({
    queryKey: ["todo", id],
    enabled: !!id,
    queryFn: async (): Promise<Todo> => {
      return await axios.get<Todo>(`/todos/${id}`).then((r) => r.data);
    },
  });

export const getMyTodos = () =>
  queryOptions({
    queryKey: ["todos", "my"],
    queryFn: async (): Promise<Todo[]> => {
      return await axios.get<Todo[]>(`/todos/my`).then((r) => r.data);
    },
  });

export const updateTodoStatus = () =>
  mutationOptions({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTodoStatusRequest;
    }) => {
      return await axios
        .patch<Todo>(`/todos/${id}/status`, data)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Status zadania zaktualizowany",
        message: "Status zadania został pomyślnie zmieniony.",
        color: "green",
      });
    },
  });

export const completeTodo = () =>
  mutationOptions({
    mutationFn: async (id: string) => {
      return await axios
        .patch<Todo>(`/todos/${id}/complete`)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Zadanie ukończone",
        message: "Zadanie zostało oznaczone jako ukończone.",
        color: "green",
      });
    },
  });

export const getLeaves = () =>
  queryOptions({
    queryKey: ["leaves"],
    queryFn: async (): Promise<LeaveResponse[]> => {
      return await axios.get<LeaveResponse[]>(`/leave`).then((r) => r.data);
    },
  });

export const addLeave = () =>
  mutationOptions({
    mutationFn: async (data: LeaveToAddRequest) => {
      return await axios.post(`/leave`, data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Wniosek urlopowy dodany",
        message: "Wniosek urlopowy został pomyślnie dodany.",
        color: "green",
      });
    },
  });

export const acceptLeave = () =>
  mutationOptions({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: LeaveStatusUpdateRequest;
    }) => {
      return await axios.patch(
        `/leave?userId=${encodeURIComponent(userId)}`,
        data,
      );
    },
    onSuccess: () => {
      notifications.show({
        title: "Wniosek urlopowy zaakceptowany",
        message: "Wniosek urlopowy został pomyślnie zaakceptowany.",
        color: "green",
      });
    },
  });

export const getLeaveTypes = () =>
  queryOptions({
    queryKey: ["leave", "types"],
    staleTime: Infinity,
    queryFn: async (): Promise<LeaveTypeResponse[]> => {
      return await axios
        .get<LeaveTypeResponse[]>(`/leave/types`)
        .then((r) => r.data);
    },
  });

export const getLeaveSummary = (userId: string, year: number) =>
  queryOptions({
    queryKey: ["leave", "summary", userId, year],
    queryFn: async (): Promise<number> => {
      return await axios
        .get<number>(
          `/leave/summary?userId=${encodeURIComponent(userId)}&year=${year}`,
        )
        .then((r) => r.data);
    },
  });

export const getMyLeaves = (year: number | undefined) =>
  queryOptions({
    queryKey: ["leave", "my", year],
    enabled: !!year,
    queryFn: async (): Promise<LeaveResponse[]> => {
      return await axios
        .get<LeaveResponse[]>(`/leave/my?year=${year}`)
        .then((r) => r.data);
    },
  });

export const getLeavesByManager = () =>
  queryOptions({
    queryKey: ["leave", "employees", "my"],
    queryFn: async (): Promise<LeaveResponse[]> => {
      return await axios
        .get<LeaveResponse[]>(`/leave/employees`)
        .then((r) => r.data);
    },
  });

export const removeLeave = () =>
  mutationOptions({
    mutationFn: async ({
      userId,
      leaveId,
    }: {
      userId: string;
      leaveId: string;
    }) => {
      return await axios.delete(
        `/leave/${leaveId}?userId=${encodeURIComponent(userId)}`,
      );
    },
    onSuccess: () => {
      notifications.show({
        title: "Wniosek urlopowy usunięty",
        message: "Wniosek urlopowy został pomyślnie usunięty.",
        color: "green",
      });
    },
  });

export const recordRfidAttendance = () =>
  mutationOptions({
    mutationFn: async (data: RfidAttendanceRequest) => {
      return await axios
        .post<AttendanceLogResponse>(`/attendance/rfid`, data)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Obecność RFID zarejestrowana",
        message: "Obecność została pomyślnie zarejestrowana przez RFID.",
        color: "green",
      });
    },
  });

export const recordManualAttendance = () =>
  mutationOptions({
    mutationFn: async (data: ManualAttendanceRequest) => {
      return await axios
        .post<AttendanceLogResponse>(`/attendance/manual`, data)
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Obecność ręczna zarejestrowana",
        message: "Obecność została pomyślnie zarejestrowana ręcznie.",
        color: "green",
      });
    },
  });

export const uploadTreatmentPlan = () =>
  mutationOptions({
    mutationFn: async ({
      patientId,
      file,
    }: {
      patientId: string;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("file", file);
      return await axios
        .post<TreatmentPlanResponse>(
          `/treatment-plans?patientId=${encodeURIComponent(patientId)}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Plan leczenia dodany",
        message: "Plan leczenia został pomyślnie przesłany.",
        color: "green",
      });
    },
  });

export const uploadPatientPhoto = () =>
  mutationOptions({
    mutationFn: async ({ id, file }: { id: string; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      return await axios
        .post<PatientPhotoResponse>(
          `/patients/${encodeURIComponent(id)}/photos`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Zdjęcie pacjenta dodane",
        message: "Zdjęcie pacjenta zostało pomyślnie przesłane.",
        color: "green",
      });
    },
  });

export const updateManager = () =>
  mutationOptions({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UpdateManagerRequest;
    }) => {
      return await axios
        .put<ApplicationUserResponse>(
          `/users/${encodeURIComponent(userId)}/manager`,
          data,
        )
        .then((r) => r.data);
    },
    onSuccess: () => {
      notifications.show({
        title: "Manager zaktualizowany",
        message: "Manager użytkownika został pomyślnie zaktualizowany.",
        color: "green",
      });
    },
  });

export const getSubordinates = (userId: string) =>
  queryOptions({
    queryKey: ["users", userId, "subordinates"],
    enabled: !!userId,
    queryFn: async (): Promise<ApplicationUserResponse[]> => {
      return await axios
        .get<
          ApplicationUserResponse[]
        >(`/users/${encodeURIComponent(userId)}/subordinates`)
        .then((r) => r.data);
    },
  });

export const disableUser = () =>
  mutationOptions({
    mutationFn: async (data: DisableUserRequest) => {
      return await axios.delete(`/users`, { data });
    },
    onSuccess: () => {
      notifications.show({
        title: "Użytkownik wyłączony",
        message: "Użytkownik został pomyślnie wyłączony.",
        color: "green",
      });
    },
  });
