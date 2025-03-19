import { protect } from "~/server/services/generics/protections";
import { editCompanyGeneral } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await editCompanyGeneral(req),
    {
      auth: true,
      permissions: ["company.edit.general"],
    },
  ));
