export interface Todo {
  id?: number;
  title: string;
  completed: boolean;
  user: {
    id: number;
    name?: string;
  };
}
