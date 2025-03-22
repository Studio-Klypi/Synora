import { protect } from "~/server/services/generics/protections";
import { deleteMember } from "~/server/services/companies/members";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await deleteMember(req),
    {
      auth: true,
      permissions: ["members.delete"],
    },
  ));
