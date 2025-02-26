import { verify } from "argon2";
import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import type { INewUserPayload, IUserLoginPayload } from "~/types/auth/users";
import { UserNotFoundError, UserConflictError } from "~/types/auth/users";
import * as usrRepo from "~/server/database/repositories/auth/users";
import * as sessionService from "~/server/services/auth/sessions";
import * as reqService from "~/server/services/auth/userRequests";
import * as errorService from "~/server/services/generics/errors";
import { UserRequestNotFoundError } from "~/types/auth/userRequests";

export async function registerUser(req: HttpRequest) {
  const payload = await readBody<INewUserPayload>(req);

  try {
    const user = await usrRepo.create(payload);
    await sessionService.createAuthSession(req, user.uuid);
    // TODO: send welcome email

    req.node.res.statusCode = HttpCode.CREATED;
    return user;
  }
  catch (e) {
    if (e instanceof UserConflictError) return errorService.throwError(req, {
      code: HttpCode.CONFLICT,
      message: `${payload.email} is already registered.`,
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
export async function loginUser(req: HttpRequest) {
  const payload = await readBody<IUserLoginPayload>(req);

  try {
    const user = await usrRepo.getByEmail(payload.email);

    if (!await verify(user.password, payload.password)) return errorService.throwError(req, {
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials!",
    });

    await sessionService.createAuthSession(req, user.uuid);

    req.node.res.statusCode = HttpCode.ACCEPTED;
    return usrRepo.purify(user);
  }
  catch (e) {
    if (e instanceof UserNotFoundError) return errorService.throwError(req, {
      code: HttpCode.UNAUTHORIZED,
      message: "Invalid credentials!",
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}

export async function requestPasswordReset(req: HttpRequest) {
  try {
    const { email } = await readBody<{ email: string }>(req);
    const user = await usrRepo.getByEmail(email);
    const request = await reqService.createRequest({
      userUuid: user.uuid,
      type: "password",
    });

    // TODO: send email
    console.log(request);
  }
  finally {
    req.node.res.statusCode = HttpCode.CREATED;
  }
}
export async function resetPassword(req: HttpRequest) {
  const userUuid = getRouterParam(req, "uuid");
  if (!userUuid) return errorService.throwError(req, {
    code: HttpCode.BAD_REQUEST,
    message: "Missing user uuid!",
  });

  try {
    const { code, password } = await readBody<{
      code: string;
      password: string;
    }>(req);
    const uuid = await reqService.getUserUuid({
      code,
      userUuid,
      type: "password",
    });

    const user = await usrRepo.updatePassword(uuid, password);
    await sessionService.logout(req, uuid);

    // TODO: send mail
    console.log(user);

    req.node.res.statusCode = HttpCode.ACCEPTED;
    return user;
  }
  catch (e) {
    if (e instanceof UserRequestNotFoundError) return errorService.throwError(req, {
      code: HttpCode.NOT_FOUND,
      message: "Invalid request credentials provided!",
    });
    return errorService.throwError(req, { stack: JSON.stringify(e) });
  }
}
