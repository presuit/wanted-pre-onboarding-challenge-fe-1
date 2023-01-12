import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import TodoListItem from "./Item";
import useTodos from "../../../hooks/useTodos";

export default function TodoList() {
  const todos = useTodos();

  return (
    <div className="w-1/3 flex flex-col gap-3 h-[70vh] p-5 bg-zinc-900 overflow-auto">
      <CreateTodo />
      <ul className="w-full flex flex-col gap-3">
        {todos?.map((todo) => {
          return <TodoListItem key={todo.id} data={todo} />;
        })}
      </ul>
    </div>
  );
}
