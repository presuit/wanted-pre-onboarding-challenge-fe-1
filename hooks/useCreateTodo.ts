import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ICreateTodoMutation, ITodo } from "../types/todo";
import { API_ENDPOINT } from "../constants/api";
import useUserToken from "./useUserToken";
import { useSetRecoilState } from "recoil";
import { createTodoModeState } from "../store/todo";

interface IMutationFnParams {
  title: string;
  content: string;
  userToken: string;
}

export default function useCreateTodo() {
  const setCreateTodoMode = useSetRecoilState(createTodoModeState);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ title, content, userToken }: IMutationFnParams) => {
      const res = await fetch(`${API_ENDPOINT}/todos`, {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          Authorization: userToken,
          "Content-Type": "application/json",
        },
      });
      return res.json();
    },
    onSuccess: () => {
      alert("Successfully Create Todo!");
      queryClient.invalidateQueries(["todos"]);
      setCreateTodoMode(false);
    },
  });

  return mutation;
}
