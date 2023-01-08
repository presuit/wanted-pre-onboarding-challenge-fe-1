import { useSetRecoilState } from "recoil";
import { createTodoModeState, todosState } from "../../store/todo";
import { useForm } from "react-hook-form";
import { API_ENDPOINT } from "../../constants/api";
import useUser from "../../hooks/useUser";

interface IForm {
  title: string;
  content: string;
}

export default function CreateTodoModal() {
  const userToken = useUser();
  const { register, handleSubmit, reset } = useForm<IForm>();
  const setCreateTodoMode = useSetRecoilState(createTodoModeState);
  const setTodos = useSetRecoilState(todosState);

  async function onSubmit({ content, title }: IForm) {
    if (!userToken) return;
    try {
      const res = await fetch(`${API_ENDPOINT}/todos`, {
        method: "POST",
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const json = await res.json();
      if (json.data) {
        alert("successfully create todo!");
        setTodos((prev) => [json.data, ...prev]);
        setCreateTodoMode(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function resetCreateTodo() {
    reset();
    setCreateTodoMode(false);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full">
      <div
        onClick={() => setCreateTodoMode((prev) => !prev)}
        className="w-full h-full cursor-pointer backdrop-blur-sm"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 bg-black border-4 border-dashed border-zinc-500 max-w-screen-md w-full rounded-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-3"
        >
          <input
            type={"text"}
            className="w-full p-3 placeholder:capitalize bg-zinc-900 placeholder:text-zinc-500 outline-none text-2xl rounded-md"
            placeholder="title"
            {...register("title", { required: true })}
          />
          <textarea
            rows={10}
            className="w-full bg-zinc-900 outline-none p-3 text-lg placeholder:capitalize rounded-md placeholder:text-zinc-500"
            placeholder="content"
            {...register("content", { required: true })}
          />
          <div className="w-full flex justify-end items-center gap-3">
            <button
              onClick={resetCreateTodo}
              type="button"
              className="p-3 bg-rose-500 rounded-md text-lg capitalize"
            >
              cancel
            </button>
            <button
              type="submit"
              className="p-3 bg-teal-500 rounded-md text-lg capitalize"
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
