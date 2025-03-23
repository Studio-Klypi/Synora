import type { IBackCompany } from "~/types/companies/companies";
import type { IBackAccountingEntry } from "~/types/accounting/entries";

export const JournalTypes = [
  "sells",
  "purchases",
  "bank",
  "cash",
  "others",
] as const;
export type EJournalType = typeof JournalTypes[number];

export interface IBackJournal {
  uuid: string;
  companyUuid: string;
  name: string;
  type: EJournalType;
  createdAt: Date;

  company?: IBackCompany;
  accountingEntries?: IBackAccountingEntry[];
}
