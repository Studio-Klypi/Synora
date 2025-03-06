import { render } from "@vue-email/render";
import type { IEmailRegistry } from "~/types/generics/emails";
import PasswordRequestTemplate from "~/server/emails/components/auth/PasswordRequestTemplate.vue";

export const usePasswordRequestCreatedTemplate: IEmailRegistry = async (options) => {
  const props = options as {
    code: string;
    userUuid: string;
  };

  return {
    text: await render(PasswordRequestTemplate, props, { plainText: true }),
    html: await render(PasswordRequestTemplate, props, { pretty: true }),
  };
};
