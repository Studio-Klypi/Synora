import { EntityNotFoundError } from "~/types/generics/errors";
import type { NullableType } from "~/types/generics/types";

export type IUserRequestType = "password";

export interface IBackUserRequest {
  code: string;
  userUuid: string;
  type: IUserRequestType;
  requestedAt: Date;
  expiresAt: Date;
  usedAt?: NullableType<Date>;
}
export type INewUserRequestPayload = Omit<IBackUserRequest, "code" | "requestedAt" | "usedAt">;

export type IUserRequestVerificationPayload = Pick<IBackUserRequest, "code" | "userUuid" | "type">;

export class UserRequestNotFoundError extends EntityNotFoundError {}
