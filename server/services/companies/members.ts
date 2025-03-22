import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import * as mbrRepo from "~/server/database/repositories/companies/members";
import * as errorService from "~/server/services/generics/errors";
import * as emailService from "~/server/services/generics/emails";
import type { IBackUser } from "~/types/auth/users";
import { useCompanyNewMemberTemplate } from "~/server/emails/templates/companies/companyNewMember";
import { useCompanyMemberAddedTemplate } from "~/server/emails/templates/companies/companyMemberAdded";
import { EntityNotFoundError } from "~/types/generics/errors";

export async function createMember(req: HttpRequest) {
  const user = req.context.user;
  const company = req.context.company;
  const { userUuid, roleId } = await readBody<{
    userUuid: string;
    roleId: number;
  }>(req);

  try {
    const member = await mbrRepo.create({
      userUuid,
      companyUuid: company.uuid,
      roleId,
    });

    emailService.send({
      to: (member.user as IBackUser).email,
      subject: `Bienvenue sur ${company.name} !`,
      template: await useCompanyNewMemberTemplate({
        adderName: user.firstName,
        companyName: company.name,
      }),
    }).catch(console.error);
    emailService.send({
      to: company.email,
      subject: "Nouvel accès octroyé !",
      template: await useCompanyMemberAddedTemplate({
        adderName: user.firstName,
        firstName: (member.user as IBackUser).firstName,
      }),
    }).catch(console.error);

    req.node.res.statusCode = HttpCode.CREATED;
    return member;
  }
  catch (e) {
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}

export async function updateMemberRole(req: HttpRequest) {
  const { uuid } = req.context.company;
  const userUuid = getRouterParam(req, "memberUuid");
  const { roleId } = await readBody<{
    roleId: number;
  }>(req);

  if (!userUuid) return errorService.throwError(req, {
    code: HttpCode.BAD_REQUEST,
    message: "User uuid parameter is missing!",
  });

  try {
    const member = await mbrRepo.update(userUuid, uuid, {
      roleId,
    });
    req.node.res.statusCode = HttpCode.ACCEPTED;
    return member;
  }
  catch (e) {
    if (e instanceof EntityNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: "Company member not found!",
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}

export async function deleteMember(req: HttpRequest) {
  const { uuid } = req.context.company;
  const userUuid = getRouterParam(req, "memberUuid");

  if (!userUuid) return errorService.throwError(req, {
    code: HttpCode.BAD_REQUEST,
    message: "User uuid parameter is missing!",
  });

  try {
    await mbrRepo.destroy(userUuid, uuid);
  }
  catch (e) {
    if (e instanceof EntityNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: "Company member not found!",
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
