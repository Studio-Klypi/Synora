import type { IEmailTemplateRegistration } from "~/types/generics/emails";
import { usePlatformUrl } from "~/server/services/generics/emails";

export const usePasswordResetTemplate: IEmailTemplateRegistration = (options) => {
  options = options as {
    firstName: string;
  };

  return {
    subject: "Mot de passe réinitialisé !",
    body: {
      text: `Super ${options.firstName}, ton mot de passe a bien été réinitialisé ! Pour une question de sécurité, tous les appareils connectés à ton compte ont été déconnecté, reconnecte-toi : ${usePlatformUrl("/portal/auth/login")}`,
      html: "",
    },
  };
};
