import useSelectedTodo from "../../../hooks/useSelectedTodo";
import { useRecoilState } from "recoil";
import { editTodoState } from "../../../store/todo";
import EditTodo from "./EditTodo";
import Content from "./Content";
import Fallback from "./Fallback";
import useUserToken from "../../../hooks/useUserToken";
import { useEffect } from "react";

export default function TodoDetail() {
  const [editMode, setEditMode] = useRecoilState(editTodoState);
  const selectedTodo = useSelectedTodo();
  const userToken = useUserToken();

  useEffect(() => {
    if (editMode) {
      setEditMode(false);
    }
  }, [selectedTodo]);

  return (
    <section className="flex-1 p-5 bg-zinc-900 rounded-md h-[70vh] overflow-auto">
      {selectedTodo ? (
        editMode ? (
          <EditTodo selectedTodo={selectedTodo} userToken={userToken} />
        ) : (
          <Content selectedTodo={selectedTodo} userToken={userToken} />
        )
      ) : (
        <Fallback />
      )}
    </section>
  );
}
