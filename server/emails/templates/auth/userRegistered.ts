import type { IEmailTemplateRegistration } from "~/types/generics/emails";

export const useUserRegisteredTemplate: IEmailTemplateRegistration = (options) => {
  options = options as {
    firstName: string;
  };

  return {
    subject: `Bienvenue ${options.firstName}`,
    body: {
      text: `Bonjour, je suis Josh.

C'est avec plaisir que je te souhaite la bienvenue sur Synora !`,
      html: "",
    },
  };
};
