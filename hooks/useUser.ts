import { useCallback, useEffect, useState } from "react";
import isLoggedIn from "../utils/isLoggedIn";
import { AUTH_TOKEN } from "../constants/auth";
import { useRouter } from "next/router";

export default function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  function handleStorage({ key, newValue }: StorageEvent) {
    if (key === AUTH_TOKEN) {
      setUser(newValue);
    }
  }

  useEffect(() => {
    setUser(window.localStorage.getItem(AUTH_TOKEN));
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn() && !router.pathname.includes("auth")) {
      //  alert(`no user! redirect to auth user:${isLoggedIn()}`);
      router.replace("/auth");
    } else if (isLoggedIn() && router.pathname.includes("auth")) {
      // alert("user aleady exists! redirect to home");
      router.replace("/");
    }
  }, [user]);

  return user;
}
