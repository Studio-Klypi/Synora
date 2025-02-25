import type { IBackAuthSession, INewAuthSessionPayload } from "~/types/auth/sessions";
import prisma from "~/server/database";

export async function create(payload: INewAuthSessionPayload): Promise<IBackAuthSession> {
  return prisma.authSession.create({
    data: {
      ...payload,
    },
  });
}

export async function getRelatedUser() {}
