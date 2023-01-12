import Layout from "../components/layout";
import useUserToken from "../hooks/useUserToken";
import TodoList from "../components/Home/TodoList";
import TodoDetail from "../components/Home/TodoDetail";
import CreateTodoModal from "../components/Home/CreateTodoModal";
import { useRecoilValue } from "recoil";
import { createTodoModeState } from "../store/todo";

function Home() {
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

export default Home;
