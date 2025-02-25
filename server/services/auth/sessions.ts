import type { HttpRequest } from "~/types/generics/requests";
import * as authRepo from "~/server/database/repositories/auth/sessions";
import { setAuthCookies } from "~/server/services/generics/cookies";

const expirationTime = 4 * 60 * 60 * 1000; // 4h

export async function createAuthSession(req: HttpRequest, uuid: string) {
  const session = await authRepo.create({
    userUuid: uuid,
    expiresAt: new Date(Date.now() + expirationTime),
  });
  setAuthCookies(req, {
    token: session.token,
    uuid: session.userUuid,
  });
}
