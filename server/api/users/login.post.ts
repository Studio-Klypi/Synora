import { loginUser } from "~/server/services/auth/users";

export default defineEventHandler(async event => await loginUser(event));
