import type { IUser } from "~/types/auth/users";
import type { IBackCompany } from "~/types/companies/companies";
import type { IBackRole } from "~/types/companies/roles";

export interface IBackCompanyMember {
  userUuid: string;
  companyUuid: string;
  roleId?: number | null;
  createdAt: Date;
  updatedAt: Date;

  user?: IUser;
  company?: IBackCompany;
  role?: IBackRole;
}

export type INewCompanyMemberPayload = Omit<IBackCompanyMember, "createdAt" | "updatedAt" | "user" | "company" | "role">;
