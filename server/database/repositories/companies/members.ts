import type { Prisma } from "@prisma/client";
import type {
  IBackCompanyMember,
  INewCompanyMemberPayload,
  IUpdateCompanyMemberPayload,
} from "~/types/companies/members";
import { CompanyMemberConflictError, CompanyMemberNotFoundError } from "~/types/companies/members";
import prisma from "~/server/database";
import type { IBackRole } from "~/types/companies/roles";
import { RoleNotFoundError } from "~/types/companies/roles";

export async function create(payload: INewCompanyMemberPayload): Promise<IBackCompanyMember> {
  try {
    return await prisma.companyMember.create({
      data: {
        ...payload,
      },
      include: {
        user: true,
        role: true,
      },
    });
  }
  catch (e) {
    switch ((e as Prisma.PrismaClientKnownRequestError).code) {
      case "P2002":
        throw new CompanyMemberConflictError();
      default:
        throw e;
    }
  }
}
export async function update(userUuid: string, companyUuid: string, payload: IUpdateCompanyMemberPayload): Promise<IBackCompanyMember> {
  const member = await prisma.companyMember.update({
    where: {
      userUuid_companyUuid: {
        userUuid,
        companyUuid,
      },
    },
    data: {
      ...payload,
    },
    include: {
      role: true,
      user: true,
    },
  });
  if (!member) throw new CompanyMemberNotFoundError();
  return member;
}
export async function destroy(userUuid: string, companyUuid: string): Promise<void> {
  const member = await prisma.companyMember.delete({
    where: {
      userUuid_companyUuid: {
        userUuid,
        companyUuid,
      },
    },
  });
  if (!member) throw new CompanyMemberNotFoundError();
  return;
}

export async function getUserRole(userUuid: string, companyUuid: string): Promise<IBackRole | null> {
  const role = await prisma.companyMember.findUnique({
    where: {
      userUuid_companyUuid: {
        userUuid,
        companyUuid,
      },
    },
  }).role();
  if (!role) throw new RoleNotFoundError();
  return role;
}
