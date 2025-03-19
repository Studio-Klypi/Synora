import type { HttpRequest } from "~/types/generics/requests";
import type { EPermissions } from "~/types/security/permissions";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IProtectionAction = (req: HttpRequest) => Promise<any>;

export interface IProtectionOptions {
  auth: boolean;
  permissions: EPermissions;
}
