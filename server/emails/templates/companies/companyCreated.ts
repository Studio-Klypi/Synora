import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import CompanyCreatedTemplate from "~/server/emails/components/companies/CompanyCreatedTemplate.vue";

export const useCompanyCreatedTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    firstName: string;
    companyName: string;
  };

  return {
    text: await render(CompanyCreatedTemplate, props, { plainText: true }),
    html: await render(CompanyCreatedTemplate, props, { pretty: true }),
  };
};
