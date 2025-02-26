import type { INewUserRequestPayload, IUserRequestVerificationPayload } from "~/types/auth/userRequests";
import * as reqRepo from "~/server/database/repositories/auth/userRequests";

const expirationTime = 15 * 60 * 1000; // 15min

export async function createRequest(payload: Omit<INewUserRequestPayload, "expiresAt">) {
  return await reqRepo.create({
    ...payload,
    expiresAt: new Date(Date.now() + expirationTime),
  });
}

export async function getUserUuid(payload: IUserRequestVerificationPayload): Promise<string> {
  const req = await reqRepo.verify(payload);
  return req.userUuid;
}
