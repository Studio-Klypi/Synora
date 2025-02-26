import { EntityNotFoundError } from "~/types/generics/errors";

export interface IBackAuthSession {
  token: string;
  userUuid: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
}

export type INewAuthSessionPayload = Omit<IBackAuthSession, "token" | "createdAt" | "revokedAt">;

export interface IAuthSessionCookies {
  token: string;
  uuid: string;
}

export class AuthSessionNotFoundError extends EntityNotFoundError {}
