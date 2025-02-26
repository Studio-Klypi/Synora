import { EntityNotFoundError } from "~/types/generics/errors";

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

export type IUserRequestVerificationPayload = Pick<IBackUserRequest, "code" | "userUuid" | "type">;

export class UserRequestNotFoundError extends EntityNotFoundError {}
