import { protect } from "~/server/services/generics/protections";
import { updateRole } from "~/server/services/companies/roles";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await updateRole(req),
    {
      auth: true,
      permissions: ["roles.manage"],
    },
  ));
