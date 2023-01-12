import { atom } from "recoil";
import { ITodo } from "../types/todo";

export const createTodoModeState = atom<boolean>({
  key: "createTodoModeState",
  default: false,
});

export const todosState = atom<ITodo[]>({ key: "todosState", default: [] });

export const editTodoState = atom<boolean>({
  default: false,
  key: "editTodoState",
});
