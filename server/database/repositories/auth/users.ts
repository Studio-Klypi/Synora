import type { Prisma } from "@prisma/client";
import { hash } from "argon2";
import type { IBackUser, INewUserPayload, IUser } from "~/types/auth/users";
import { UserNotFoundError, UserConflictError } from "~/types/auth/users";
import prisma from "~/server/database";

export function purify(user: IBackUser): IUser {
  const partial = { ...user } as Partial<IBackUser>;
  delete partial.password;
  return partial as IUser;
}

export async function create(payload: INewUserPayload): Promise<IUser> {
  try {
    const user = await prisma.user.create({
      data: {
        ...payload,
        password: await hash(payload.password),
        lastName: payload.lastName.toUpperCase(),
      },
    });
    return purify(user);
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new UserConflictError();
      default:
        throw e;
    }
  }
}
export async function updatePassword(uuid: string, password: string): Promise<IUser> {
  const user = await prisma.user.update({
    where: {
      uuid,
      deletedAt: null,
    },
    data: {
      password: await hash(password),
    },
  });
  if (!user) throw new UserNotFoundError();
  return purify(user);
}

/**
 * TODO:
 * - export async function get(uuid: string): Promise<IBackUser> {}
 */
export async function getByEmail(email: string): Promise<IBackUser> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) throw new UserNotFoundError();
  return user;
}
