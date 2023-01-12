import { useRecoilValue, useSetRecoilState } from "recoil";
import { editTodoState } from "../../../store/todo";
import { formatDate } from "../../../utils/todo";
import useDeleteTodo from "../../../hooks/useDeleteTodo";
import { useCallback } from "react";
import { ITodo } from "../../../types/todo";

interface IProps {
  selectedTodo: ITodo | null;
  userToken: string;
}

export default function Content({ selectedTodo, userToken }: IProps) {
  const deleteTodoMutation = useDeleteTodo();
  const setEditMode = useSetRecoilState(editTodoState);

  function onDeleteTodo() {
    if (!selectedTodo || !userToken) return;
    if (confirm("Are you want to delete this todo?"))
      deleteTodoMutation.mutate({ selectedTodo, userToken });
  }

  // const toggleEditMode = useCallback(() => {
  //   setEditMode((prev) => !prev);
  // }, [setEditMode]);

  return (
    <div className="relative w-full h-full">
      <div className="flex justify-between items-end gap-3 pb-3 border-b border-dashed border-zinc-500">
        <h2 className="text-3xl font-bold w-full">{selectedTodo?.title}</h2>
        <span className="text-sm font-medium text-zinc-500 flex-shrink-0">
          {selectedTodo && formatDate(selectedTodo.createdAt)}
        </span>
      </div>
      <pre className="pt-5 text-lg">{selectedTodo?.content}</pre>
      <div className="absolute bottom-0 left-0 w-full flex justify-end items-center gap-3">
        <button
          onClick={onDeleteTodo}
          className="p-3 bg-rose-500 font-bold rounded-md"
        >
          delete
        </button>
        <button
          onClick={() => setEditMode((prev) => !prev)}
          className="p-3 bg-teal-500 font-bold rounded-md"
        >
          edit
        </button>
      </div>
    </div>
  );
}
