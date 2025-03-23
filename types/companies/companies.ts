import type { IBackRole } from "~/types/companies/roles";
import type { IBackCompanyMember } from "~/types/companies/members";
import { EntityNotFoundError } from "~/types/generics/errors";
import type { NullableType } from "~/types/generics/types";
import type { IBackAccount } from "~/types/accounting/accounts";
import type { IBackJournal } from "~/types/accounting/journals";
import type { IBackAccountingEntry } from "~/types/accounting/entries";

export interface IBackCompany {
  uuid: string;
  name: string;
  email: string;
  phone?: NullableType<string>;
  address: string;
  corporateName: string;
  siret?: NullableType<string>;
  siren?: NullableType<string>;
  dateOfBirth: Date;
  createdAt: Date;
  updatedAt: Date;

  roles?: IBackRole[];
  members?: IBackCompanyMember[];
  accounts?: IBackAccount[];
  journals?: IBackJournal[];
  accountingEntries?: IBackAccountingEntry[];
}

export type INewCompanyPayload = Omit<IBackCompany, "uuid" | "createdAt" | "updatedAt" | "roles" | "members">;
export type IUpdateCompanyPayload = INewCompanyPayload;

export interface CompaniesState {
  companies: IBackCompany[];
  selectedCompany: NullableType<IBackCompany>;
  // company
  loading: boolean;
  updatingCompany: boolean;
  deletingCompany: boolean;
  // roles
  loadingRoles: boolean;
  creatingRole: boolean;
  deletingRole: boolean;
  // members
  creatingMember: boolean;
  updatingMember: boolean;
  deletingMember: boolean;
}

export class CompanyNotFoundError extends EntityNotFoundError {}
