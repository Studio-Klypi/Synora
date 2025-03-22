import type { Prisma } from "@prisma/client";
import type { IBackCompanyMember, INewCompanyMemberPayload } from "~/types/companies/members";
import { CompanyMemberConflictError } from "~/types/companies/members";
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
