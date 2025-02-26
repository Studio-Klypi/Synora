import { requestPasswordReset } from "~/server/services/auth/users";

export default defineEventHandler(async event => await requestPasswordReset(event));
