import { API_ENDPOINT } from "../constants/api";
import { AUTH_TOKEN } from "../constants/auth";

interface IRegisterMutationParams {
  email: string;
  password: string;
  url: string;
}
export async function handleRegisterMutation({
  email,
  password,
  url,
}: IRegisterMutationParams) {
  return (
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  ).json();
}
