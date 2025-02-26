import type { HttpRequest } from "~/types/generics/requests";
import type { INewCompanyPayload } from "~/types/companies/companies";
import * as cpyRepo from "~/server/database/repositories/companies/companies";
import * as mbrRepo from "~/server/database/repositories/companies/members";
import * as errorService from "~/server/services/generics/errors";
import * as emailService from "~/server/services/generics/emails";
import { HttpCode } from "~/types/generics/requests";
import { useCompanyCreatedTemplate } from "~/server/emails/templates/companies/companyCreated";
import { useCompanyCreatedByTemplate } from "~/server/emails/templates/companies/companyCreatedBy";

export async function createCompany(req: HttpRequest) {
  const payload = await readBody<INewCompanyPayload>(req);

  try {
    const user = req.context.user;
    const company = await cpyRepo.create(payload);
    await mbrRepo.create({
      userUuid: user.uuid,
      companyUuid: company.uuid,
      roleId: company.roles?.[0].id,
    });

    emailService.send({
      to: user.email,
      template: useCompanyCreatedTemplate({
        firstName: user.firstName,
        companyName: company.name,
      }),
    }).catch(console.error);
    emailService.send({
      to: company.email,
      template: useCompanyCreatedByTemplate({
        firstName: user.firstName,
        companyName: company.name,
      }),
    }).catch(console.error);

    req.node.res.statusCode = HttpCode.CREATED;
    return cpyRepo.purify(company);
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
