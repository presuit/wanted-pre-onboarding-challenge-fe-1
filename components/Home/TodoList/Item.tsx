import Link from "next/link";
import { ITodo } from "../../../types/todo";
import { formatDate } from "../../../utils/todo";

interface IProps {
  data: ITodo;
}

export default function TodoListItem({ data }: IProps) {
  return (
    <Link href={`/?todoId=${data.id}`}>
      <li className="w-full bg-zinc-800 p-3 rounded-md font-bold text-lg flex gap-3 justify-between items-end">
        <span className="block overflow-ellipsis overflow-hidden whitespace-nowrap">
          {data.title}
        </span>
        <span className="block flex-shrink-0 text-sm text-zinc-500">
          {formatDate(data.createdAt)}
        </span>
      </li>
    </Link>
  );
}
