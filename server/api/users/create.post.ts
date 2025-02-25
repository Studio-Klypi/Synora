import { registerUser } from "~/server/services/auth/users";

export default defineEventHandler(async event => registerUser(event));
