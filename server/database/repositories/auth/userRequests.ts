import type { IBackUserRequest, INewUserRequestPayload } from "~/types/auth/userRequests";
import prisma from "~/server/database";

export async function create(payload: INewUserRequestPayload): Promise<IBackUserRequest> {
  return prisma.userRequest.create({
    data: {
      ...payload,
    },
  });
}

// TODO: get related user
