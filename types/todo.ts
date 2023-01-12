export interface ITodo {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateTodoMutation {
  title: string;
  content: string;
}
