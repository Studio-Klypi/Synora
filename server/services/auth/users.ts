import { verify } from "argon2";
import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import type { INewUserPayload, IUserLoginPayload } from "~/types/auth/users";
import { UserNotFoundError, UserConflictError } from "~/types/auth/users";
import * as usrRepo from "~/server/database/repositories/auth/users";
import * as sessionService from "~/server/services/auth/sessions";
import * as errorService from "~/server/services/generics/errors";

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
