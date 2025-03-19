import { protect } from "~/server/services/generics/protections";
import { deleteRole } from "~/server/services/companies/roles";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await deleteRole(req),
    {
      auth: true,
      permissions: [
        "roles.manage",
      ],
    },
  ));
