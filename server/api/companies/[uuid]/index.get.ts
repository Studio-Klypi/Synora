import { protect } from "~/server/services/generics/protections";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => req.context.company,
    {
      auth: true,
      permissions: [],
    },
  ));
