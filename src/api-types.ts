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

export interface ApplicationUser {
  displayName: string;
  email: string;
  firstName: string;
  lastName: string;
  plmedId: string;
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

export interface CreateUserRequest {
  /** @minLength 1 */
  email: string;
  /** @minLength 1 */
  firstName: string;
  /** @minLength 1 */
  lastName: string;
  /** @minLength 1 */
  phoneNumber: string;
  /** @minLength 1 */
  plmedId: string;
  /** @minLength 1 */
  role: "ADMIN" | "DOCTOR" | "ASSISTANT" | "RECEPTIONIST";
}

export interface PlmedUser {
  displayName: string;
  id: string;
}

export interface UserId {
  value?: string;
}
