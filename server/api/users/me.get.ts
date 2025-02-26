import { protect } from "~/server/services/generics/protections";
import { whoAmI } from "~/server/services/auth/sessions";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => await whoAmI(req),
    {
      auth: true,
      permissions: [],
    },
  ));
