import { useEffect, useState } from "react";
import { AUTH_TOKEN } from "../constants/auth";
import { useRouter } from "next/router";

export default function useUserToken() {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string>("");

  useEffect(() => {
    const authToken = window.localStorage.getItem(AUTH_TOKEN);
    if (authToken) {
      setUserToken(authToken);
    } else {
      router.replace("/auth");
    }
  }, []);

  return userToken;
}
