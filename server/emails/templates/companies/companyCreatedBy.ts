import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import CompanyCreatedByTemplate from "~/server/emails/components/companies/CompanyCreatedByTemplate.vue";

export const useCompanyCreatedByTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    firstName: string;
    companyName: string;
  };

  return {
    text: await render(CompanyCreatedByTemplate, props, { plainText: true }),
    html: await render(CompanyCreatedByTemplate, props, { pretty: true }),
  };
};
