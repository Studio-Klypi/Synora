import type { HttpRequest } from "~/types/generics/requests";
import * as roleRepo from "~/server/database/repositories/companies/roles";
import * as errorService from "~/server/services/generics/errors";
import type { INewRolePayload } from "~/types/companies/roles";
import { HttpCode } from "~/types/generics/requests";

export async function createRole(req: HttpRequest) {
  const company = req.context.company;

  try {
    const body = await readBody<Omit<INewRolePayload, "companyUuid">>(req);
    const role = await roleRepo.create({
      ...body,
      companyUuid: company.uuid,
    });

    req.node.res.statusCode = HttpCode.CREATED;
    return role;
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}

export async function getRoles(req: HttpRequest) {
  const company = req.context.company;

  try {
    return await roleRepo.getList(company.uuid);
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
