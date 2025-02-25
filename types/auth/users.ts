import { DatabaseConflictError } from "~/types/generics/errors";

export interface IBackUser {
  uuid: string;
  phone?: string | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}
export type IUser = Omit<IBackUser, "password">;

export type INewUserPayload = Omit<IBackUser, "uuid" | "createdAt" | "updatedAt" | "deletedAt">;

export class UserConflictError extends DatabaseConflictError {}
