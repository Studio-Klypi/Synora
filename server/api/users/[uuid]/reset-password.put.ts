import { resetPassword } from "~/server/services/auth/users";

export default defineEventHandler(async event => await resetPassword(event));
