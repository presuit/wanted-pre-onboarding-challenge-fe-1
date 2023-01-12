import { useQuery } from "@tanstack/react-query";
import { ITodo } from "../types/todo";
import useUserToken from "./useUserToken";
import { API_ENDPOINT } from "../constants/api";

export default function useTodos() {
  const userToken = useUserToken();
  const { data } = useQuery<{ data: ITodo[] }>(["todos"], {
    enabled: Boolean(userToken),
    queryFn: async () => {
      return (
        await fetch(`${API_ENDPOINT}/todos`, {
          method: "GET",
          headers: {
            Authorization: userToken,
          },
        })
      ).json();
    },
  });

  return data?.data;
}
