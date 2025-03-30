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
