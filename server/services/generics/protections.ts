import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import type { IProtectionAction, IProtectionOptions } from "~/types/generics/protections";
import { getAuthCookies } from "~/server/services/generics/cookies";
import * as errorService from "~/server/services/generics/errors";
import * as authRepo from "~/server/database/repositories/auth/sessions";
import * as mbrRepo from "~/server/database/repositories/companies/members";
import * as cpyRepo from "~/server/database/repositories/companies/companies";
import { AuthSessionNotFoundError } from "~/types/auth/sessions";
import { CompanyNotFoundError } from "~/types/companies/companies";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function protect(req: HttpRequest, callback: IProtectionAction, options?: IProtectionOptions): Promise<any> {
  if (!options || !options.auth)
    return await callback(req);

  const cookies = getAuthCookies(req);
  if (!cookies)
    return errorService.throwError(req, {
      code: HttpCode.UNAUTHORIZED,
      message: "No session provided or provided session invalid!",
    });

  try {
    const user = await authRepo.getRelatedUser(cookies);
    req.context.user = user;

    const companyUuid = getRouterParam(req, "companyUuid");
    if (!companyUuid) return await callback(req);

    const company = await cpyRepo.get(user.uuid, companyUuid);
    req.context.company = company;

    const role = await mbrRepo.getUserRole(user.uuid, company.uuid);
    req.context.role = role;

    if (!options.permissions.length)
      return await callback(req);

    if (!role || !role.permissions.some(p => options.permissions.includes(p)))
      return errorService.throwError(req, {
        code: HttpCode.UNAUTHORIZED,
        message: "Not enough permissions to perform this!",
      });

    return await callback(req);
  }
  catch (e) {
    if (e instanceof AuthSessionNotFoundError) return errorService.throwError(req, {
      code: HttpCode.FORBIDDEN,
      message: "Invalid session provided!",
    });
    if (e instanceof CompanyNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: "Company not found!",
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
