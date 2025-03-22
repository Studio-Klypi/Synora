import { protect } from "~/server/services/generics/protections";
import { searchUsersByPartialEmail } from "~/server/services/auth/users";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await searchUsersByPartialEmail(req),
    {
      auth: true,
      permissions: [],
    },
  ));
