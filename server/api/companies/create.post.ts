import { protect } from "~/server/services/generics/protections";
import { createCompany } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await createCompany(req),
    {
      auth: true,
      permissions: [],
    },
  ));
