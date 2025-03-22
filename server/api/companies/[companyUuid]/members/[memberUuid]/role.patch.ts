import { protect } from "~/server/services/generics/protections";
import { updateMemberRole } from "~/server/services/companies/members";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await updateMemberRole(req),
    {
      auth: true,
      permissions: ["members.edit-role"],
    },
  ));
