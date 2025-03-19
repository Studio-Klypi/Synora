import type { Prisma } from "@prisma/client";
import type { IBackRole, INewRolePayload, IUpdateRolePayload } from "~/types/companies/roles";
import { RoleConflictError, RoleNotFoundError } from "~/types/companies/roles";
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
export async function update(identifier: {
  id: number;
  companyUuid: string;
}, payload: IUpdateRolePayload): Promise<IBackRole> {
  const role = await prisma.role.update({
    where: {
      ...identifier,
    },
    data: payload,
    include: {
      members: true,
    },
  });
  if (!role) throw new RoleNotFoundError();
  return role;
}
export async function destroy(id: number, companyUuid: string): Promise<IBackRole> {
  const role = await prisma.role.delete({
    where: {
      id,
      companyUuid,
    },
  });
  if (!role) throw new RoleNotFoundError();
  return role;
}
export async function destroyMany(ids: number[], companyUuid: string): Promise<void> {
  await prisma.role.deleteMany({
    where: {
      id: {
        in: ids,
      },
      companyUuid,
    },
  });
  return;
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
    include: {
      members: true,
    },
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
