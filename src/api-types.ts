/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ApplicationUserResponse {
  displayName: string;
  email: string;
  id: string;
  phoneNumber: string;
}

export interface AppointmentPatientResponse {
  firstName: string;
  lastName: string;
}

export interface AppointmentResponse {
  /** @format date */
  date: string;
  endTime: string;
  notes: string;
  patient?: AppointmentPatientResponse;
  startTime: string;
}

export interface AttendanceLogResponse {
  id: string;
  method: "RFID_CARD" | "MANUAL";
  /** @format date-time */
  timestamp: string;
  type: "ENTRY" | "EXIT";
  userId: string;
}

export interface CreateAccountRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  phoneNumber: string;
  /** @minLength 1 */
  referenceUserId: string;
  role: "ADMIN" | "DOCTOR" | "ASSISTANT" | "RECEPTIONIST" | "WAREHOUSE";
}

export interface CreateOrderItemRequest {
  comment?: string;
  id: string;
  name: string;
  /** @format int32 */
  quantity?: number;
}

export interface CreateOrderRequest {
  comment?: string;
  items: CreateOrderItemRequest[];
}

export interface CreateTodoRequest {
  assignedToRole?:
    | "ADMIN"
    | "DOCTOR"
    | "ASSISTANT"
    | "RECEPTIONIST"
    | "WAREHOUSE";
  assignedToUserId?: string;
  context: "PATIENT" | "REMINDER" | "RULE";
  description?: string;
  /** @format date */
  dueDate?: string;
  /** @format int32 */
  patientId?: number;
  recurrenceRule?: RecurrenceRule;
  /** @minLength 1 */
  title: string;
}

export interface DisableUserRequest {
  /** @minLength 1 */
  id: string;
}

export interface InternalUserResponse {
  account: string;
  displayName: string;
  email?: string;
  firstName: string;
  id: string;
  lastName: string;
  phoneNumber?: string;
}

export interface ManualAttendanceRequest {
  /** @format date-time */
  timestamp: string;
  type: "ENTRY" | "EXIT";
}

export interface OrderItem {
  comment?: string;
  delivered?: boolean;
  productId: string;
  productName: string;
  /** @format int32 */
  quantity?: number;
}

export interface PatientAppointmentResponse {
  /** @format date */
  date: string;
  endTime: string;
  notes: string;
  startTime: string;
}

export interface PatientFileResponse {
  fileName: string;
  id: string;
}

export interface PatientPhotoResponse {
  contentType: string;
  filename: string;
  id: string;
  patientId: string;
  /** @format date-time */
  uploadedAt: string;
}

export interface PatientResponse {
  city?: string;
  displayName: string;
  email?: string;
  id: string;
  phoneNumber?: string;
}

export interface PatientSearchResultItemResponse {
  city?: string;
  displayName: string;
  email?: string;
  id: string;
  phoneNumber?: string;
}

export interface RecurrenceRule {
  /** @uniqueItems true */
  daysOfWeek?: (
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
  )[];
}

export interface RfidAttendanceRequest {
  rfidCardId: string;
  type: "ENTRY" | "EXIT";
}

export interface TaskSuggestion {
  description?: string;
  priority?: string;
}

export interface Todo {
  assignedToRole?:
    | "ADMIN"
    | "DOCTOR"
    | "ASSISTANT"
    | "RECEPTIONIST"
    | "WAREHOUSE";
  assignedToUserId?: string;
  /** @format date-time */
  completedAt?: string;
  completedBy?: string;
  context: "PATIENT" | "REMINDER" | "RULE";
  /** @format date-time */
  createdAt: string;
  createdBy: string;
  description?: string;
  /** @format date */
  dueDate?: string;
  id: string;
  /** @format int32 */
  patientId?: number;
  recurrenceRule?: RecurrenceRule;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  title: string;
  /** @format date-time */
  updatedAt?: string;
}

export interface TreatmentPlanResponse {
  fileName: string;
  id: string;
  patientId: string;
  taskSuggestions: TaskSuggestion[];
  /** @format date-time */
  uploadedAt: string;
}

export interface UpdateManagerRequest {
  managerId?: string;
}

export interface UpdateOrderStatusRequest {
  status: "PENDING" | "ORDERED" | "DELIVERED" | "CANCELLED";
}

export interface UpdateTodoStatusRequest {
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

export interface WarehouseOrder {
  comment?: string;
  /** @format date-time */
  createdAt: string;
  id: string;
  items: OrderItem[];
  status: "PENDING" | "ORDERED" | "DELIVERED" | "CANCELLED";
  /** @format date-time */
  updatedAt?: string;
  userId: string;
}

export interface WarehouseProduct {
  /** @format int32 */
  currentStock?: number;
  id: string;
  name: string;
  photoUrl?: string;
}
