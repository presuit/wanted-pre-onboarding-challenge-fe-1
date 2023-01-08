import { atom } from "recoil";
import { AUTH_TOKEN } from "../constants/auth";

export type TAuthMode = "SIGN_IN" | "SIGN_UP";
export const authModeState = atom<TAuthMode>({
  key: "authModeState",
  default: "SIGN_IN",
});

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default:
    typeof window !== "undefined"
      ? Boolean(window.localStorage.getItem(AUTH_TOKEN))
      : false,
});
