import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import * as mbrRepo from "~/server/database/repositories/companies/members";
import * as errorService from "~/server/services/generics/errors";
import * as emailService from "~/server/services/generics/emails";
import type { IBackUser } from "~/types/auth/users";
import { useCompanyNewMemberTemplate } from "~/server/emails/templates/companies/companyNewMember";
import { useCompanyMemberAddedTemplate } from "~/server/emails/templates/companies/companyMemberAdded";

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
