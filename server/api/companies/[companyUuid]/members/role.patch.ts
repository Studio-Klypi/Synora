import { protect } from "~/server/services/generics/protections";
import { updateManyMembersRole } from "~/server/services/companies/members";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await updateManyMembersRole(req),
    {
      auth: true,
      permissions: ["members.edit-role"],
    },
  ));
