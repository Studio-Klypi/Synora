import { protect } from "~/server/services/generics/protections";

export default defineEventHandler(async event =>
  await protect(
    event,
    async req => req.context.role?.permissions ?? [],
    {
      auth: true,
      permissions: [],
    },
  ));
