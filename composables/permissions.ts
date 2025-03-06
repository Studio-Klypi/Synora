import type { EPermission } from "~/types/security/permissions";

export function disabledByPermission(permission: EPermission): boolean {
  const permissions = useUserStore().permissions;
  return !permissions.includes(permission);
}
