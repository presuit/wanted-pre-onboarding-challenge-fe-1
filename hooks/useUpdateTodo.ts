import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodo } from "../types/todo";
import { API_ENDPOINT } from "../constants/api";
import { useSetRecoilState } from "recoil";
import { editTodoState } from "../store/todo";

interface IMutationFnParams {
  selectedTodo: ITodo;
  title: string;
  content: string;
  userToken: string;
}

export default function useUpdateTodo() {
  const setEditMode = useSetRecoilState(editTodoState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      content,
      selectedTodo,
      title,
      userToken,
    }: IMutationFnParams) => {
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
      return res.json();
    },
    onSuccess: ({ data: updatedTodo }: { data?: ITodo }) => {
      if (updatedTodo) {
        queryClient.invalidateQueries(["todos"]);
        setEditMode(false);
        alert("successfully edit todo!");
      }
    },
  });

  return mutation;
}
