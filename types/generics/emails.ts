import type { IAnyComposed } from "~/types/generics/objects";

export interface IEmailBody {
  text: string;
  html: string;
}

export interface IEmailTemplate {
  subject?: string;
  body: IEmailBody;
  attachments?: IEmailAttachment[];
}

export interface IEmailAttachment {
  filename: string;
  path: string;
  contentType: string;
}

export interface IEmailSendRequest {
  to: string;
  subject?: string;
  template: IEmailTemplate;
  attachments?: IEmailAttachment[];
}

export type IEmailTemplateRegistration = (options?: IAnyComposed) => IEmailTemplate;
