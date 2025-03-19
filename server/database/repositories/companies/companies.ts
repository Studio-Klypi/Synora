import type {
  IBackCompany,
  INewCompanyPayload,
  IUpdateCompanyPayload,
} from "~/types/companies/companies";
import prisma from "~/server/database";
import { defaultCompanyRoles } from "~/server/database/default-data/company-roles";
import type { IOpListResult } from "~/types/generics/database";
import { CompanyNotFoundError } from "~/types/companies/companies";

export function purify(company: IBackCompany): IBackCompany {
  const json = { ...company };
  delete json.roles;
  delete json.members;
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
      roles: {
        include: {
          members: true,
        },
      },
    },
  });
}
export async function update(uuid: string, payload: IUpdateCompanyPayload): Promise<IBackCompany> {
  const company = await prisma.company.update({
    where: {
      uuid,
    },
    data: {
      ...payload,
    },
    include: {
      roles: {
        include: {
          members: true,
        },
      },
    },
  });
  if (!company) throw new CompanyNotFoundError();
  return company;
}
export async function destroy(uuid: string): Promise<void> {
  await prisma.company.delete({
    where: {
      uuid,
    },
  });
  return;
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

export async function get(userUuid: string, uuid: string): Promise<IBackCompany> {
  const company = await prisma.company.findUnique({
    where: {
      uuid,
      members: {
        some: {
          userUuid,
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      roles: {
        include: {
          members: true,
        },
      },
    },
  });
  if (!company) throw new CompanyNotFoundError();
  return {
    ...company,
    roles: company.roles.sort((a, b) => (a.id > b.id ? 1 : -1)),
  };
}
