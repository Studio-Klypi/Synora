import type { HttpRequest } from "~/types/generics/requests";
import { HttpCode } from "~/types/generics/requests";
import type { HttpErrorBody } from "~/types/generics/errors";

export function throwError(req: HttpRequest, body?: HttpErrorBody) {
  return sendError(req, createError({
    statusCode: body?.code ?? HttpCode.INTERNAL_ERROR,
    statusMessage: body?.message ?? "Internal Server Error occurred!",
    stack: body?.stack,
  }));
}
