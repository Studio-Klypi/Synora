import type { IEmailTemplateRegistration } from "~/types/generics/emails";

export const useCompanyCreatedByTemplate: IEmailTemplateRegistration = (options) => {
  options = options as {
    firstName: string;
    companyName: string;
  };

  return {
    subject: "Wahou, toute nouvelle organisation !",
    body: {
      text: `Bonjour ${options.companyName} ! ${options.firstName} a enregistré votre organisation sur Synora ! Il est aujourd'hui le seul à avoir les droits sur l'organisation. Contactez-le pour vous accorder les droits qui vous sont attribués.`,
      html: "",
    },
  };
};
