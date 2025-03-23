import { protect } from "~/server/services/generics/protections";
import { deleteMembers } from "~/server/services/companies/members";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await deleteMembers(req),
    {
      auth: true,
      permissions: ["members.delete"],
    },
  ));
