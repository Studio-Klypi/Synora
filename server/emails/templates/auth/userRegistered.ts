import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import UserRegisteredTemplate from "~/server/emails/components/auth/UserRegisteredTemplate.vue";

export const useUserRegisteredTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    firstName: string;
  };

  return {
    text: await render(UserRegisteredTemplate, props, { plainText: true }),
    html: await render(UserRegisteredTemplate, props, { pretty: true }),
  };
};
