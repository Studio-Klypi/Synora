import type { HttpCode } from "~/types/generics/requests";

export interface HttpErrorBody {
  code?: HttpCode;
  message?: string;
  stack?: string;
}

export class DatabaseConflictError extends Error {}
export class EntityNotFoundError extends Error {}
