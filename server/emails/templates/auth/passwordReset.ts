import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import PasswordResetTemplate from "~/server/emails/components/auth/PasswordResetTemplate.vue";

export const usePasswordResetTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    firstName: string;
  };

  return {
    text: await render(PasswordResetTemplate, props, { plainText: true }),
    html: await render(PasswordResetTemplate, props, { pretty: true }),
  };
};
