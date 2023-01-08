import { formatDate } from "../../../utils/todo";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ITodo } from "../../../types/todo";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todosState } from "../../../store/todo";
import { API_ENDPOINT } from "../../../constants/api";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";

function useSelectedTodo() {
  const router = useRouter();
  const todos = useRecoilValue(todosState);
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    let todo: ITodo | null = null;
    if (todos.length > 0 && router.query.todoId) {
      todo = todos.find((todo) => todo.id === router.query.todoId) || null;
    }
    setSelectedTodo(todo);
  }, [router.query, todos]);

  return selectedTodo;
}

interface IForm {
  title: string;
  content: string;
}
export default function TodoDetail() {
  const router = useRouter();
  const userToken = useUser();
  const setTodos = useSetRecoilState(todosState);
  const selectedTodo = useSelectedTodo();
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit, reset, setFocus, setValue } =
    useForm<IForm>();

  async function handleDelete() {
    if (confirm("Are you want to delete this todo?")) {
      if (!selectedTodo || !userToken) return;
      try {
        const res = await fetch(`${API_ENDPOINT}/todos/${selectedTodo.id}`, {
          method: "DELETE",
          headers: {
            Authorization: userToken,
          },
        });
        await res.json();
        setTodos((prev) => prev.filter((todo) => todo.id !== selectedTodo.id));
        router.replace("/");
      } catch (error) {
        console.log(error);
      }
    }
  }

  function toggleEditMode() {
    setEditMode((prev) => !prev);
  }

  async function onSubmit({ content, title }: IForm) {
    // updateTodo
    if (!selectedTodo || !userToken) return;
    try {
      const res = await fetch(`${API_ENDPOINT}/todos/${selectedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken,
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const json = await res.json();
      if (json.data) {
        const updatedTodo = json.data as ITodo;
        setTodos((prev) =>
          [
            ...prev.filter((todo) => todo.id !== updatedTodo.id),
            updatedTodo,
          ].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB.getTime() - dateA.getTime();
          })
        );
        setEditMode(false);
        alert("successfully edit todo!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCancelEditMode() {
    reset();
    setEditMode(false);
  }

  useEffect(() => {
    if (editMode && selectedTodo) {
      setValue("title", selectedTodo.title);
      setValue("content", selectedTodo.content);
      setFocus("title");
    }
  }, [editMode]);

  useEffect(() => {
    if (editMode) {
      setEditMode(false);
    }
  }, [selectedTodo]);

  return (
    <section className="flex-1 p-5 bg-zinc-900 rounded-md h-[70vh] overflow-auto">
      {/* <aside className="fixed bottom-0 left-0 p-5 w-full">
        <div className="p-5 bg-white rounded-md text-black w-full">
          <span>{JSON.stringify(selectedTodo)}</span>
        </div>
      </aside> */}
      {selectedTodo ? (
        editMode ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full h-full flex flex-col"
          >
            <div className="flex justify-between items-end gap-3 pb-3 border-b border-dashed border-zinc-500">
              <input
                className="text-3xl font-bold outline-none bg-zinc-900 w-full"
                {...register("title", {
                  required: true,
                })}
              />
              <span className="text-sm font-medium text-zinc-500 flex-shrink-0">
                {formatDate(selectedTodo.createdAt)}
              </span>
            </div>
            <textarea
              className="pt-5 text-lg bg-zinc-900 w-full outline-none flex-1 mb-20"
              {...register("content", {
                required: true,
              })}
            ></textarea>
            <div className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-3">
              <button
                type="button"
                onClick={handleCancelEditMode}
                className="p-3 bg-rose-500 font-bold rounded-md"
              >
                cancel
              </button>
              <button
                type="submit"
                className="p-3 bg-teal-500 font-bold rounded-md"
              >
                confirm
              </button>
            </div>
          </form>
        ) : (
          <div className="relative w-full h-full">
            <div className="flex justify-between items-end gap-3 pb-3 border-b border-dashed border-zinc-500">
              <h2 className="text-3xl font-bold w-full">
                {selectedTodo.title}
              </h2>
              <span className="text-sm font-medium text-zinc-500 flex-shrink-0">
                {formatDate(selectedTodo.createdAt)}
              </span>
            </div>
            <pre className="pt-5 text-lg">{selectedTodo.content}</pre>
            <div className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-3">
              <button
                onClick={handleDelete}
                className="p-3 bg-rose-500 font-bold rounded-md"
              >
                delete
              </button>
              <button
                onClick={toggleEditMode}
                className="p-3 bg-teal-500 font-bold rounded-md"
              >
                edit
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="text-center text-2xl capitalize font-bold">
          click todo and see detail.
        </div>
      )}
    </section>
  );
}
