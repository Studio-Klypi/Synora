import type { NullableType } from "~/types/generics/types";
import type { IBackCompany } from "~/types/companies/companies";
import type { IBackAccountingEntry } from "~/types/accounting/entries";

export const AccountTypes = [
  "active",
  "passive",
  "charges",
  "products",
  "others",
] as const;
export type EAccountType = typeof AccountTypes[number];

export interface IBackAccount {
  id: number;
  number: number;
  companyUuid: string;
  name: string;
  type: EAccountType;
  createdAt: Date;
  archivedAt?: NullableType<Date>;

  company?: IBackCompany;
  creditEntries?: IBackAccountingEntry[];
  debitEntries?: IBackAccountingEntry[];
}
