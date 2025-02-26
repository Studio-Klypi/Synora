import type { HttpRequest } from "~/types/generics/requests";
import type { INewUserRequestPayload } from "~/types/auth/userRequests";
import * as reqRepo from "~/server/database/repositories/auth/userRequests";

const expirationTime = 15 * 60 * 1000; // 15min

export async function createRequest(req: HttpRequest, payload: Omit<INewUserRequestPayload, "expiresAt">) {
  return await reqRepo.create({
    ...payload,
    expiresAt: new Date(Date.now() + expirationTime),
  });
}
