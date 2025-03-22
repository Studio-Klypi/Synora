import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import type {
  INewCompanyPayload,
  IUpdateCompanyPayload,
} from "~/types/companies/companies";
import * as cpyRepo from "~/server/database/repositories/companies/companies";
import * as mbrRepo from "~/server/database/repositories/companies/members";
import * as errorService from "~/server/services/generics/errors";
import * as emailService from "~/server/services/generics/emails";
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
      subject: "Wahou, toute nouvelle organisation !",
      template: await useCompanyCreatedTemplate({
        firstName: user.firstName,
        companyName: company.name,
      }),
    }).catch(console.error);
    emailService.send({
      to: company.email,
      subject: "Wahou, toute nouvelle organisation !",
      template: await useCompanyCreatedByTemplate({
        firstName: user.firstName,
        companyName: company.name,
      }),
    }).catch(console.error);

    req.node.res.statusCode = HttpCode.CREATED;
    return company;
  }
  catch (e) {
    console.error(e);
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
export async function editCompany(req: HttpRequest) {
  const company = req.context.company;
  const payload = await readBody<IUpdateCompanyPayload>(req);

  try {
    const updated = await cpyRepo.update(company.uuid, payload);
    req.node.res.statusCode = HttpCode.ACCEPTED;
    return updated;
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
export async function deleteCompany(req: HttpRequest) {
  const company = req.context.company;

  try {
    await cpyRepo.destroy(company.uuid);
    req.node.res.statusCode = HttpCode.ACCEPTED;
    return;
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}

export async function getSelfCompanies(req: HttpRequest) {
  try {
    const user = req.context.user;
    return await cpyRepo.getFromUser(user.uuid);
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
