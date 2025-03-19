export interface ICookiesOptions {
  path: string;
  secure: boolean;
  httpOnly: boolean;
}

export const authCookiesOptions: ICookiesOptions = {
  path: "/",
  httpOnly: true,
  // todo: secure: true,
  secure: false,
};
