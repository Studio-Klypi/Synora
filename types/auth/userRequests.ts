export type IUserRequestType = "password";

export interface IBackUserRequest {
  code: string;
  userUuid: string;
  type: IUserRequestType;
  requestedAt: Date;
  expiresAt: Date;
  usedAt?: Date | null;
}
export type INewUserRequestPayload = Omit<IBackUserRequest, "code" | "requestedAt" | "usedAt">;
