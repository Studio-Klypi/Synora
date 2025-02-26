import type { H3Event } from "h3";

export type HttpRequest = H3Event<Request>;
export enum HttpCode {
  // 200
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,
  // 400
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  // 500
  INTERNAL_ERROR = 500,
}
