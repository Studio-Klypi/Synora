import type { IUser } from "~/types/auth/users";
import type { IBackCompany } from "~/types/companies/companies";
import type { IBackRole } from "~/types/companies/roles";
import { DatabaseConflictError } from "~/types/generics/errors";

export interface IBackCompanyMember {
  userUuid: string;
  companyUuid: string;
  roleId?: number | null;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser;
  company?: IBackCompany;
  role?: IBackRole | null;
}

export type INewCompanyMemberPayload = Omit<IBackCompanyMember, "createdAt" | "updatedAt" | "user" | "company" | "role">;

export class CompanyMemberConflictError extends DatabaseConflictError {}
