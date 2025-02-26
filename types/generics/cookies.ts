export interface ICookiesOptions {
  path: string;
  secure: boolean;
  httpOnly: boolean;
}

export const authCookiesOptions: ICookiesOptions = {
  path: "/",
  httpOnly: true,
  secure: true,
};
