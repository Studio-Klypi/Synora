import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import CompanyNewMemberTemplate from "~/server/emails/components/companies/CompanyNewMemberTemplate.vue";

export const useCompanyNewMemberTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    adderName: string;
    companyName: string;
  };

  return {
    text: await render(CompanyNewMemberTemplate, props, { plainText: true }),
    html: await render(CompanyNewMemberTemplate, props, { pretty: true }),
  };
};
