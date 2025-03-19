import type { INewRolePayload } from "~/types/companies/roles";

export const defaultCompanyRoles: Omit<INewRolePayload, "companyUuid">[] = [
  {
    name: "Président",
    permissions: [
      "company.security.delete",
      "company.edit.general",
      "roles.manage",
      "roles.assign",
    ],
  },
  {
    name: "Vice-Président",
    permissions: [
      "company.edit.general",
      "roles.manage",
      "roles.assign",
    ],
  },
  {
    name: "Secrétaire",
    permissions: [
    ],
  },
  {
    name: "Trésorier",
    permissions: [
    ],
  },
];
