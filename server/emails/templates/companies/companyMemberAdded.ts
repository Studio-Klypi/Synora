import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import CompanyMemberAddedTemplate from "~/server/emails/components/companies/CompanyMemberAddedTemplate.vue";

export const useCompanyMemberAddedTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    adderName: string;
    firstName: string;
  };

  return {
    text: await render(CompanyMemberAddedTemplate, props, { plainText: true }),
    html: await render(CompanyMemberAddedTemplate, props, { pretty: true }),
  };
};
