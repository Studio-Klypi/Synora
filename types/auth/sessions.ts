import { EntityNotFoundError } from "~/types/generics/errors";
import type { NullableType } from "~/types/generics/types";

export interface IBackAuthSession {
  token: string;
  userUuid: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: NullableType<Date>;
}

export type INewAuthSessionPayload = Omit<IBackAuthSession, "token" | "createdAt" | "revokedAt">;

export interface IAuthSessionCookies {
  token: string;
  uuid: string;
}

export class AuthSessionNotFoundError extends EntityNotFoundError {}
