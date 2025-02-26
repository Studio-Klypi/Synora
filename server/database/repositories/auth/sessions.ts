import type { IAuthSessionCookies, IBackAuthSession, INewAuthSessionPayload } from "~/types/auth/sessions";
import prisma from "~/server/database";
import type { IBackUser } from "~/types/auth/users";
import { AuthSessionNotFoundError } from "~/types/auth/sessions";

export async function create(payload: INewAuthSessionPayload): Promise<IBackAuthSession> {
  return prisma.authSession.create({
    data: {
      ...payload,
    },
  });
}

export async function getRelatedUser(payload: IAuthSessionCookies): Promise<IBackUser> {
  const user = await prisma.authSession.findUnique({
    where: {
      token_userUuid: {
        token: payload.token,
        userUuid: payload.uuid,
      },
    },
  }).user();
  console.log(user);
  if (!user) throw new AuthSessionNotFoundError();
  return user;
}

export async function verify(payload: IAuthSessionCookies): Promise<IBackAuthSession> {
  const session = await prisma.authSession.findUnique({
    where: {
      token_userUuid: {
        token: payload.token,
        userUuid: payload.uuid,
      },
    },
  });
  if (!session) throw new AuthSessionNotFoundError();
  return session;
}
