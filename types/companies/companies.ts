import type { IBackRole } from "~/types/companies/roles";
import type { IBackCompanyMember } from "~/types/companies/members";
import { EntityNotFoundError } from "~/types/generics/errors";

export interface IBackCompany {
  uuid: string;
  name: string;
  email: string;
  phone?: string | null;
  address: string;
  corporateName: string;
  siret?: string | null;
  siren?: string | null;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;

  roles?: IBackRole[];
  members?: IBackCompanyMember[];
}

export type INewCompanyPayload = Omit<IBackCompany, "uuid" | "createdAt" | "updatedAt" | "roles" | "members">;

export interface CompaniesState {
  companies: IBackCompany[];
  selectedCompany: IBackCompany | null;
  loading: boolean;
  loadingRoles: boolean;
}

export class CompanyNotFoundError extends EntityNotFoundError {}
