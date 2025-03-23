import { DatabaseConflictError, EntityNotFoundError } from "~/types/generics/errors";
import type { EPermissions } from "~/types/security/permissions";
import type { NullableType } from "~/types/generics/types";

export interface UserState {
  me: NullableType<IUser>;
  permissions: EPermissions;
  loading: boolean;
}

export interface IBackUser {
  uuid: string;
  phone?: NullableType<string>;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: NullableType<Date>;
}
export type IUser = Omit<IBackUser, "password">;

export type IUserLoginPayload = Pick<IBackUser, "email" | "password">;

export type INewUserPayload = Omit<IBackUser, "uuid" | "createdAt" | "updatedAt" | "deletedAt">;

export class UserConflictError extends DatabaseConflictError {}
export class UserNotFoundError extends EntityNotFoundError {}
