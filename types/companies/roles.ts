import type { IBackCompany } from "~/types/companies/companies";
import type { IBackCompanyMember } from "~/types/companies/members";
import { DatabaseConflictError } from "~/types/generics/errors";

export interface IBackRole {
  id: number;
  companyUuid: string;
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;

  company?: IBackCompany;
  members?: IBackCompanyMember[];
}

export type INewRolePayload = Omit<IBackRole, "id" | "createdAt" | "updatedAt" | "company" | "members">;

export class RoleConflictError extends DatabaseConflictError {}
