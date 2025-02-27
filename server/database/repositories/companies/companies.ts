import type { IBackCompany, INewCompanyPayload } from "~/types/companies/companies";
import prisma from "~/server/database";
import { defaultCompanyRoles } from "~/server/database/default-data/company-roles";
import type { IOpListResult } from "~/types/generics/database";

export function purify(company: IBackCompany): IBackCompany {
  const json = { ...company } as Partial<IBackCompany>;
  delete json.roles;
  return json as IBackCompany;
}

export async function create(payload: INewCompanyPayload): Promise<IBackCompany> {
  return prisma.company.create({
    data: {
      ...payload,
      roles: {
        create: defaultCompanyRoles,
      },
    },
    include: {
      roles: true,
    },
  });
}

export async function getFromUser(uuid: string): Promise<IOpListResult<IBackCompany>> {
  const list = await prisma.company.findMany({
    where: {
      members: {
        some: {
          userUuid: uuid,
        },
      },
    },
  });

  return {
    data: list.map(purify),
    meta: {
      count: list.length,
      total: list.length,
      totalPages: 1,
    },
  };
}
