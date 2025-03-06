export const RolePermissions = [
  "roles.manage",
  "roles.assign",
] as const;
export const Permissions = [
  ...RolePermissions,
] as const;

export type EPermission = typeof Permissions[number];
export type EPermissions = EPermission[];
