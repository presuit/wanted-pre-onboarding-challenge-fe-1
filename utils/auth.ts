import { AUTH_TOKEN } from "../constants/auth";

export function isLoggedIn() {
  return (
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem(AUTH_TOKEN))
  );
}
