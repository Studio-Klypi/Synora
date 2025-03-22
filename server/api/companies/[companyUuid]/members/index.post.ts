import { protect } from "~/server/services/generics/protections";
import { createMember } from "~/server/services/companies/members";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await createMember(req),
    {
      auth: true,
      permissions: ["members.add"],
    },
  ));
