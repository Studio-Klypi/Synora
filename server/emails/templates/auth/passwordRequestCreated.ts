import type { IEmailTemplateRegistration } from "~/types/generics/emails";
import { usePlatformUrl } from "~/server/services/generics/emails";

export const usePasswordRequestCreatedTemplate: IEmailTemplateRegistration = (options) => {
  options = options as {
    code: string;
    userUuid: string;
  };

  return {
    subject: "Réinitialisation de ton mot de passe",
    body: {
      text: `Oh non, tu as oublié ton mot de passe ? Pas de soucis, voici un lien pour le réinitialiser : ${usePlatformUrl(`/security/resetPassword/${options.userUuid}/${options.code}`)} (attention, il n'est valable que 15 minutes)`,
      html: "",
    },
  };
};
