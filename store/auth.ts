import { atom } from "recoil";
import { TAuthMode } from "../types/auth";

export const authModeState = atom<TAuthMode>({
  key: "authModeState",
  default: "SIGN_IN",
});
