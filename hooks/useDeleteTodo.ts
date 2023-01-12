import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITodo } from "../types/todo";
import { API_ENDPOINT } from "../constants/api";
import { useRouter } from "next/router";

interface IMutationFnParam {
  selectedTodo: ITodo;
  userToken: string;
}

export default function useDeleteTodo() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({ selectedTodo, userToken }: IMutationFnParam) => {
      return (
        await fetch(`${API_ENDPOINT}/todos/${selectedTodo.id}`, {
          method: "DELETE",
          headers: {
            Authorization: userToken,
          },
        })
      ).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
      router.replace("/");
    },
  });

  return mutation;
}
