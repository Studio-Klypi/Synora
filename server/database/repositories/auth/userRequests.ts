import type {
  IBackUserRequest,
  INewUserRequestPayload,
  IUserRequestVerificationPayload,
} from "~/types/auth/userRequests";
import prisma from "~/server/database";
import { UserRequestNotFoundError } from "~/types/auth/userRequests";

export async function create(payload: INewUserRequestPayload): Promise<IBackUserRequest> {
  return prisma.userRequest.create({
    data: {
      ...payload,
    },
  });
}

export async function verify(payload: IUserRequestVerificationPayload): Promise<IBackUserRequest> {
  const req = await prisma.userRequest.update({
    where: {
      code_userUuid: {
        code: payload.code,
        userUuid: payload.userUuid,
      },
      type: payload.type,
      expiresAt: {
        gt: new Date(),
      },
      usedAt: null,
    },
    data: {
      usedAt: new Date(),
    },
  });
  if (!req) throw new UserRequestNotFoundError();
  return req;
}

export async function prune() {
  return prisma.userRequest.deleteMany({
    where: {
      OR: [
        {
          NOT: {
            usedAt: null,
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
