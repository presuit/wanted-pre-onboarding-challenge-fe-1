import { useRecoilState } from "recoil";
import { authModeState } from "../../store/auth";

export default function Header() {
  const [mode, setMode] = useRecoilState(authModeState);
  return (
    <header className="border-b border-zinc-800">
      <button
        onClick={() => setMode("SIGN_IN")}
        className={`w-1/2 p-3 ${
          mode === "SIGN_IN" ? "bg-zinc-700" : "hover:bg-zinc-800"
        }`}
      >
        Sign In
      </button>
      <button
        onClick={() => setMode("SIGN_UP")}
        className={`w-1/2 p-3 ${
          mode === "SIGN_UP" ? "bg-zinc-700" : "hover:bg-zinc-800"
        }`}
      >
        Sign Up
      </button>
    </header>
  );
}
