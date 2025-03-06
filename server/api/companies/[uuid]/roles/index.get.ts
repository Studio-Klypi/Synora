import { protect } from "~/server/services/generics/protections";
import { getRoles } from "~/server/services/companies/roles";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await getRoles(req),
    {
      auth: true,
      permissions: [],
    },
  ));
