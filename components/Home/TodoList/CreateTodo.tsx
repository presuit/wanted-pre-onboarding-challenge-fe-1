import { useSetRecoilState } from "recoil";
import { createTodoModeState } from "../../../store/todo";
import { useCallback } from "react";

export default function CreateTodo() {
  const setCreateTodoMode = useSetRecoilState(createTodoModeState);
  const toggleCreateTodoMode = useCallback(() => {
    setCreateTodoMode((prev) => !prev);
  }, [setCreateTodoMode]);

  return (
    <button
      onClick={toggleCreateTodoMode}
      className="w-full p-3 bg-teal-500 flex justify-center items-center gap-1 rounded-md hover:bg-teal-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-lg capitalize">create todo</span>
    </button>
  );
}
