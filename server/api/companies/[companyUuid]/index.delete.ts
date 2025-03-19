import { protect } from "~/server/services/generics/protections";
import { deleteCompany } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await deleteCompany(req),
    {
      auth: true,
      permissions: ["company.security.delete"],
    },
  ));
