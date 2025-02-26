import type { INewRolePayload } from "~/types/companies/roles";

export const defaultCompanyRoles: Omit<INewRolePayload, "companyUuid">[] = [
  {
    name: "Président",
    permissions: [
    ],
  },
  {
    name: "Vice-Président",
    permissions: [
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
