import type { Prisma } from "@prisma/client";
import type { IBackRole, INewRolePayload } from "~/types/companies/roles";
import { RoleConflictError } from "~/types/companies/roles";
import prisma from "~/server/database";
import type { IOpListQuery, IOpListResult } from "~/types/generics/database";

export async function create(payload: INewRolePayload): Promise<IBackRole> {
  try {
    return await prisma.role.create({
      data: {
        ...payload,
      },
    });
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new RoleConflictError();
      default:
        throw e;
    }
  }
}

export async function getList(uuid: string, options: IOpListQuery = {
  limit: {
    page: 1,
    perPage: 20,
  },
}): Promise<IOpListResult<IBackRole>> {
  const where = {
    companyUuid: uuid,
  };
  const total = await prisma.role.count({ where });
  const list = await prisma.role.findMany({
    where,
    skip: options.limit ? (options.limit.page - 1) * options.limit.perPage : 0,
    take: options.limit ? options.limit.perPage : -1,
  });

  return {
    data: list,
    meta: {
      count: list.length,
      total,
      totalPages: options.limit ? Math.ceil(total / options.limit.perPage) : 1,
    },
  };
}
