import { useForm } from "react-hook-form";
import useUserToken from "../../../hooks/useUserToken";
import useUpdateTodo from "../../../hooks/useUpdateTodo";
import { formatDate } from "../../../utils/todo";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { editTodoState } from "../../../store/todo";
import { ITodo } from "../../../types/todo";

interface IForm {
  title: string;
  content: string;
}

interface IProps {
  selectedTodo: ITodo | null;
  userToken: string;
}

export default function EditTodo({ selectedTodo, userToken }: IProps) {
  const updateTodoMutation = useUpdateTodo();
  const [editMode, setEditMode] = useRecoilState(editTodoState);
  const { register, handleSubmit, reset, setFocus, setValue } =
    useForm<IForm>();

  const handleUpdateTodo = useCallback(({ content, title }: IForm) => {
    if (!selectedTodo || !userToken) return;
    updateTodoMutation.mutate({ content, selectedTodo, title, userToken });
  }, []);

  const handleCancelEditMode = useCallback(() => {
    reset();
    setEditMode(false);
  }, [reset, setEditMode]);

  useEffect(() => {
    if (editMode && selectedTodo) {
      setValue("title", selectedTodo.title);
      setValue("content", selectedTodo.content);
      setFocus("title");
    }
  }, [editMode]);

  return (
    <form
      onSubmit={handleSubmit(handleUpdateTodo)}
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
          {selectedTodo && formatDate(selectedTodo.createdAt)}
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
        <button type="submit" className="p-3 bg-teal-500 font-bold rounded-md">
          confirm
        </button>
      </div>
    </form>
  );
}
