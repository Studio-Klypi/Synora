import type { Prisma } from "@prisma/client";
import type { IBackCompanyMember, INewCompanyMemberPayload } from "~/types/companies/members";
import { CompanyMemberConflictError } from "~/types/companies/members";
import prisma from "~/server/database";

export async function create(payload: INewCompanyMemberPayload): Promise<IBackCompanyMember> {
  try {
    return await prisma.companyMember.create({
      data: {
        ...payload,
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
