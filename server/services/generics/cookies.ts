import type { ICookiesOptions } from "~/types/generics/cookies";
import { authCookiesOptions } from "~/types/generics/cookies";
import type { HttpRequest } from "~/types/generics/requests";
import type { IAuthSessionCookies } from "~/types/auth/sessions";
import type { IStringComposed } from "~/types/generics/objects";

export function setCookies(req: HttpRequest, cookies: {
  name: string;
  value: string;
}[], options?: ICookiesOptions) {
  for (const c of cookies)
    setCookie(req, c.name, c.value, options);
}
export function getCookies(req: HttpRequest, names: string[]): IStringComposed {
  const obj: IStringComposed = {};

  for (const n of names)
    obj[n] = getCookie(req, n);

  return obj;
}
export function clearCookies(req: HttpRequest, names: string[]) {
  for (const n of names)
    deleteCookie(req, n);
}

export function setAuthCookies(req: HttpRequest, payload: IAuthSessionCookies) {
  setCookies(req, [
    {
      name: "authToken",
      value: payload.token,
    },
    {
      name: "userUuid",
      value: payload.uuid,
    },
  ], authCookiesOptions);
}
export function getAuthCookies(req: HttpRequest): IAuthSessionCookies | null {
  const { authToken, userUuid } = getCookies(req, ["authToken", "userUuid"]);
  if (!authToken || !userUuid) return null;
  return {
    token: authToken,
    uuid: userUuid,
  };
}
export function clearAuthCookies(req: HttpRequest) {
  clearCookies(req, ["authToken", "userUuid"]);
}
