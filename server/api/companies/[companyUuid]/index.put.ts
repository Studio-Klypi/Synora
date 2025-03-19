import { protect } from "~/server/services/generics/protections";
import { editCompany } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await editCompany(req),
    {
      auth: true,
      permissions: ["company.edit.general"],
    },
  ));
