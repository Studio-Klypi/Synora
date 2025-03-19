import type { HttpRequest } from "~/types/generics/requests";
import * as roleRepo from "~/server/database/repositories/companies/roles";
import * as errorService from "~/server/services/generics/errors";
import type { INewRolePayload, IUpdateRolePayload } from "~/types/companies/roles";
import { HttpCode } from "~/types/generics/requests";
import { RoleNotFoundError } from "~/types/companies/roles";

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
export async function updateRole(req: HttpRequest) {
  const company = req.context.company;

  const roleId = getRouterParam(req, "roleId");
  const payload = await readBody<Omit<IUpdateRolePayload, "companyUuid">>(req);

  try {
    return await roleRepo.update({
      id: Number(roleId),
      companyUuid: company.uuid,
    }, payload);
  }
  catch (e) {
    if (e instanceof RoleNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: `Role (#${roleId}) not found!`,
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
export async function deleteRole(req: HttpRequest) {
  const company = req.context.company;
  const roleId = getRouterParam(req, "roleId");
  if (!roleId) return errorService.throwError(req, {
    code: HttpCode.BAD_REQUEST,
    message: "Role id is required!",
  });

  try {
    const role = await roleRepo.destroy(Number(roleId), company.uuid);

    req.node.res.statusCode = HttpCode.ACCEPTED;
    return role;
  }
  catch (e) {
    if (e instanceof RoleNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: "Role not found!",
    });
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
