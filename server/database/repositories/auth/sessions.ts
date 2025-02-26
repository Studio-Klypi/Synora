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
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
  }).user();
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
      expiresAt: {
        gt: new Date(),
      },
      revokedAt: null,
    },
  });
  if (!session) throw new AuthSessionNotFoundError();
  return session;
}

export async function logoutTotally(uuid: string) {
  const now = new Date();

  await prisma.authSession.updateMany({
    where: {
      userUuid: uuid,
      expiresAt: {
        gt: now,
      },
      revokedAt: null,
    },
    data: {
      revokedAt: now,
    },
  });
}

export async function prune() {
  return prisma.authSession.deleteMany({
    where: {
      OR: [
        {
          NOT: {
            revokedAt: null,
          },
        },
        {
          expiresAt: {
            lte: new Date(),
          },
        },
      ],
    },
  });
}
