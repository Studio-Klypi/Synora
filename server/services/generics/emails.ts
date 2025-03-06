import { v4 as uuidv4 } from "uuid";
import { render } from "@vue-email/render";
import type { IEmailSendRequest } from "~/types/generics/emails";
import { useMailer } from "#mailer";

const transporter = () => {
  const { customTransporter } = useMailer();
  const { mailerHost, mailerPort, mailerUser, mailerPass } = useRuntimeConfig();

  return customTransporter({
    auth: {
      user: mailerUser,
      pass: mailerPass,
    },
    host: mailerHost,
    port: Number(mailerPort),
    secure: true,
  });
};

export const usePlatformUrl = (path: string) => {
  const { appUrl } = useRuntimeConfig().public;
  return `${appUrl}/${path.startsWith("/") ? path.substring(1) : path}`;
};

export async function send(payload: IEmailSendRequest) {
  const { sendMail } = useMailer();
  const { mailerFromEmail, mailerFromName } = useRuntimeConfig();

  const id = uuidv4().replaceAll("-", "");

  return sendMail({
    requestId: id,
    transporter: transporter(),
    options: {
      to: payload.to,
      subject: payload.subject ?? "Sujet iconnu.",
      fromEmail: mailerFromEmail,
      fromName: mailerFromName,
      text: payload.template.text,
      html: payload.template.html,
      attachments: payload.attachments ?? undefined,
    },
  }).catch(e => console.error(e, id));
}
