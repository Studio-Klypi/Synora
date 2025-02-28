import type { HttpRequest } from "~/types/generics/requests";
import * as roleRepo from "~/server/database/repositories/companies/roles";
import * as errorService from "~/server/services/generics/errors";

export async function getRoles(req: HttpRequest) {
  const company = req.context.company;

  try {
    return await roleRepo.getList(company.uuid);
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
