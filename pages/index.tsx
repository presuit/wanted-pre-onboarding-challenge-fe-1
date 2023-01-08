import Layout from "../components/layout";
import useUser from "../hooks/useUser";
import TodoList from "../components/Home/TodoList";
import TodoDetail from "../components/Home/TodoDetail";
import CreateTodoModal from "../components/Home/CreateTodoModal";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createTodoModeState, todosState } from "../store/todo";
import { useEffect } from "react";
import { API_ENDPOINT } from "../constants/api";

function useTodos() {
  const userToken = useUser();
  const setTodos = useSetRecoilState(todosState);

  async function fetchTodos() {
    if (!userToken) return;
    try {
      const res = await fetch(`${API_ENDPOINT}/todos`, {
        method: "GET",
        headers: {
          Authorization: userToken,
        },
      });
      const json = await res.json();
      if (json.data && Array.isArray(json.data)) {
        setTodos(
          [...json.data].sort((a, b) => {
            const dateA = new Date(a.createdAt) as Date;
            const dateB = new Date(b.createdAt) as Date;
            return dateB.getTime() - dateA.getTime();
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (userToken) {
      fetchTodos();
    }
  }, [userToken]);
}

export default function Home() {
  useTodos();
  const createTodoMode = useRecoilValue(createTodoModeState);

  return (
    <Layout>
      <h1 className="text-5xl font-extrabold capitalize text-center py-5">
        {"let's make some todo!"}
      </h1>
      <main className="w-full p-10 flex gap-5">
        <TodoList />
        <TodoDetail />
      </main>
      {createTodoMode && <CreateTodoModal />}
    </Layout>
  );
}
