import type { IBackCompany } from "~/types/companies/companies";
import type { IBackJournal } from "~/types/accounting/journals";
import type { IBackAccount } from "~/types/accounting/accounts";

export interface IBackAccountingEntry {
  uuid: string;
  companyUuid: string;
  journalUuid: string;
  date: Date;
  reference: string;
  creditAccountId: number;
  debitAccountId: number;
  amount: number;
  label: string;
  createdAt: Date;

  company?: IBackCompany;
  journal?: IBackJournal;
  creditAccount: IBackAccount;
  debitAccount: IBackAccount;
}
