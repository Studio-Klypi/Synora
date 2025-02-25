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
