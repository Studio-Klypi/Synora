import { protect } from "~/server/services/generics/protections";
import { createRole } from "~/server/services/companies/roles";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await createRole(req),
    {
      auth: true,
      permissions: [
        "roles.manage",
      ],
    },
  ));
