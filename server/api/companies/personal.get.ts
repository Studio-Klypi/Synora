import { protect } from "~/server/services/generics/protections";
import { getSelfCompanies } from "~/server/services/companies/companies";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await getSelfCompanies(req),
    {
      auth: true,
      permissions: [],
    },
  ));
