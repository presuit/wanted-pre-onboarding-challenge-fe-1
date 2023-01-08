import Link from "next/link";
import { PropsWithChildren } from "react";
import useUser from "../hooks/useUser";
import { AUTH_TOKEN } from "../constants/auth";
import { useRouter } from "next/router";

export default function Layout({ children }: PropsWithChildren) {
  const userToken = useUser();
  const router = useRouter();
  function handleSignOut() {
    window.localStorage.removeItem(AUTH_TOKEN);
    router.reload();
  }

  return (
    <div className="w-full min-h-screen bg-black text-white">
      <header className="w-full bg-zinc-900 flex justify-center items-center mb-5">
        <div className="w-full max-w-screen-xl py-3 flex justify-between items-center">
          <Link
            className="capitalize p-2 px-3 rounded-md hover:bg-zinc-800 font-bold text-2xl"
            href={"/"}
          >
            Home
          </Link>
          {userToken ? (
            <button
              onClick={handleSignOut}
              className="capitalize font-bold text-2xl p-2 px-3 rounded-md hover:bg-zinc-800"
            >
              sign out
            </button>
          ) : (
            <Link
              className="capitalize p-2 px-3 rounded-md hover:bg-zinc-800 text-2xl font-bold"
              href={"/auth"}
            >
              Register
            </Link>
          )}
        </div>
      </header>
      {children}
    </div>
  );
}
