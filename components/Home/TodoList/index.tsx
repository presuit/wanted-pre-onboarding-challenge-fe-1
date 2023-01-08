import { useRecoilValue } from "recoil";
import CreateTodo from "./CreateTodo";
import TodoListItem from "./Item";
import { todosState } from "../../../store/todo";

export default function TodoList() {
  const todos = useRecoilValue(todosState);
  return (
    <div className="w-1/3 flex flex-col gap-3 h-[70vh] p-5 bg-zinc-900 overflow-auto">
      <CreateTodo />
      <ul className="w-full flex flex-col gap-3">
        {todos.map((todo) => {
          return <TodoListItem key={todo.id} data={todo} />;
        })}
      </ul>
    </div>
  );
}
