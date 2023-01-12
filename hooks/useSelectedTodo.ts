import { useRouter } from "next/router";
import useUserToken from "./useUserToken";
import useTodos from "./useTodos";
import { useEffect, useState } from "react";
import { ITodo } from "../types/todo";

export default function useSelectedTodo() {
  const router = useRouter();
  const todos = useTodos();
  const [selectedTodo, setSelectedTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    let todo: ITodo | null = null;
    if (todos && todos.length > 0 && router.query.todoId) {
      todo = todos.find((todo) => todo.id === router.query.todoId) || null;
    }
    setSelectedTodo(todo);
  }, [router.query, todos]);

  return selectedTodo;
}
