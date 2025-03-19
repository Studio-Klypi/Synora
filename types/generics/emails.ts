import type { IAnyComposed } from "~/types/generics/objects";

export type IEmailComponent = Component;

export interface IEmailTemplate {
  html: string;
  text: string;
}

export interface IEmailAttachment {
  filename: string;
  path: string;
  contentType: string;
}

export interface IEmailSendRequest {
  to: string;
  subject: string;
  template: IEmailTemplate;
  attachments?: IEmailAttachment[];
}

export type IEmailRegistry = (options: IAnyComposed) => Promise<IEmailTemplate>;
