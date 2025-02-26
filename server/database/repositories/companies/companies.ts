import type { IBackCompany, INewCompanyPayload } from "~/types/companies/companies";
import prisma from "~/server/database";
import { defaultCompanyRoles } from "~/server/database/default-data/company-roles";

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
