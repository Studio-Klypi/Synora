import { protect } from "~/server/services/generics/protections";
import { getCompany } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await getCompany(req),
    {
      auth: true,
      permissions: [],
    },
  ));
