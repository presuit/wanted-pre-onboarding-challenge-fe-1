import { useForm } from "react-hook-form";
import { API_ENDPOINT } from "../../../constants/api";
import ErrorMsg from "./ErrorMsg";
import { AUTH_TOKEN, EMAIL_VALIDATE_REGEX } from "../../../constants/auth";
import { useRecoilValue } from "recoil";
import { authModeState } from "../../../store/auth";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { handleRegisterMutation } from "../../../queries/auth";

interface IAuthForm {
  email: string;
  password: string;
}

interface IRegisterMutationResults {
  token?: string;
  details?: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const authMode = useRecoilValue(authModeState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuthForm>({ mode: "onSubmit" });

  const mutation = useMutation({
    onSuccess: (data: IRegisterMutationResults) => {
      if (data.token) {
        window.localStorage.setItem(AUTH_TOKEN, data.token);
        router.push("/");
      } else if (data.details) {
        alert(data.details);
      }
    },
    mutationFn: handleRegisterMutation,
  });

  const onSubmit = useCallback(
    ({ email, password }: IAuthForm) => {
      const urlSegment =
        authMode === "SIGN_IN" ? "/users/login" : "/users/create";
      mutation.mutate({ email, password, url: `${API_ENDPOINT}${urlSegment}` });
    },
    [authMode]
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
