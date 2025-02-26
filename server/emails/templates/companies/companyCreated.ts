import type { IEmailTemplateRegistration } from "~/types/generics/emails";

export const useCompanyCreatedTemplate: IEmailTemplateRegistration = (options) => {
  options = options as {
    firstName: string;
    companyName: string;
  };

  return {
    subject: "Wahou, toute nouvelle organisation !",
    body: {
      text: `Bravo ${options.firstName} ! "${options.companyName}" est dès maintenant enregistrée. Continue la configuration sur la plateforme, personnalise-la à ta guise ou demande à quelqu'un de ton organisation de t'aider.`,
      html: "",
    },
  };
};
