import { useForm } from "react-hook-form";
import { API_ENDPOINT } from "../../../constants/api";
import ErrorMsg from "./ErrorMsg";
import { AUTH_TOKEN, EMAIL_VALIDATE_REGEX } from "../../../constants/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authModeState, isLoggedInState } from "../../../store/auth";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface IAuthForm {
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const authMode = useRecoilValue(authModeState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthForm>({ mode: "onSubmit" });

  const onSubmit = useCallback(
    async ({ email, password }: IAuthForm) => {
      const API_URL_SEGMENT =
        authMode === "SIGN_IN" ? "/users/login" : "/users/create";

      try {
        const res = await fetch(`${API_ENDPOINT}${API_URL_SEGMENT}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const json = await res.json();
        if (json.token) {
          window.localStorage.setItem(AUTH_TOKEN, json.token);
          setIsLoggedIn(true);
          router.push("/");
        } else if (json.details) {
          alert(json.details);
        }
      } catch (error) {
        console.log(error);
      } finally {
        reset();
      }
    },
    [authMode, router, reset, setIsLoggedIn]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input
          className="w-full p-3 rounded-md bg-zinc-800 outline-none"
          placeholder="email"
          type={"text"}
          {...register("email", {
            required: { message: "email is required!", value: true },
            pattern: {
              message:
                "your email address is not valid. please check it again.",
              value: EMAIL_VALIDATE_REGEX,
            },
          })}
        />
        <input
          className="w-full p-3 rounded-md bg-zinc-800 outline-none"
          placeholder="password"
          type={"password"}
          {...register("password", {
            required: {
              message: "password is required!",
              value: true,
            },
            minLength: {
              message: "minimum Length of Password is 8!",
              value: 8,
            },
          })}
        />
        <button className="w-full p-3 bg-zinc-500 rounded-md hover:bg-zinc-600">
          Submit
        </button>
      </form>
      {Object.keys(errors).length > 0 && (
        <div className="flex flex-col gap-3 pt-5">
          {errors.email && <ErrorMsg text={errors.email.message} />}
          {errors.password && <ErrorMsg text={errors.password.message} />}
        </div>
      )}
    </>
  );
}
