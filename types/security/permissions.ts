export const RolePermissions = [
  "roles.manage",
  "roles.assign",
] as const;
export const CompanyPermissions = [
  "company.security.delete",
  "company.edit.general",
] as const;
export const MembersPermissions = [
  "members.add",
  "members.edit-role",
  "members.delete",
] as const;
export const Permissions = [
  ...RolePermissions,
  ...CompanyPermissions,
  ...MembersPermissions,
] as const;

export type EPermission = typeof Permissions[number];
export type EPermissions = EPermission[];
