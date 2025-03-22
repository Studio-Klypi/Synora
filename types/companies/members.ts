import type { IUser } from "~/types/auth/users";
import type { IBackCompany } from "~/types/companies/companies";
import type { IBackRole } from "~/types/companies/roles";
import { DatabaseConflictError, EntityNotFoundError } from "~/types/generics/errors";

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
export type IUpdateCompanyMemberPayload = Partial<INewCompanyMemberPayload>;

export class CompanyMemberConflictError extends DatabaseConflictError {}
export class CompanyMemberNotFoundError extends EntityNotFoundError {}
