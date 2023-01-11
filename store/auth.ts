import { atom } from "recoil";
import { AUTH_TOKEN } from "../constants/auth";
import { TAuthMode } from "../types/auth";

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
