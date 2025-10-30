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

export interface Appointment {
  /** @format date */
  date: string;
  endTime: string;
  notes: string;
  patient?: AppointmentPatient;
  startTime: string;
}

export interface AppointmentPatient {
  firstName: string;
  lastName: string;
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
  role: "ADMIN" | "DOCTOR" | "ASSISTANT" | "RECEPTIONIST";
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

export interface PatientResponse {
  city?: string;
  displayName: string;
  id: string;
  phoneNumber?: string;
}

export interface PatientSearchResultItemResponse {
  city?: string;
  displayName: string;
  id: string;
  phoneNumber?: string;
}
