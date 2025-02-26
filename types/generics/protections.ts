import type { HttpRequest } from "~/types/generics/requests";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IProtectionAction = (req: HttpRequest) => Promise<any>;

export interface IProtectionOptions {
  auth: boolean;
  permissions: string[];
}
