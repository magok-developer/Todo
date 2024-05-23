import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todoData } from "../../public/data/dummyData";

export type TodoType = {
  id: number;
  todo: string;
  date: string;
  checked: boolean;
  isEditable: boolean;
};

type TodoStore = {
  todos: TodoType[];
  filter: string;
  nextId: number;
  setTodos: (todos: TodoType[]) => void;
  setFilter: (filter: string) => void;
  handleClickCheck: (id: number) => void;
  handleClickDelete: (id: number) => void;
  handleClickAll: () => void;
  handleClickActive: () => void;
  handleClickComplete: () => void;
  handleChange: (id: number, e: any) => void;
  handleClickEdit: (id: number) => void;
  handleClickClear: () => void;
  createTodo: (text: string, date: string) => void;
};

const useTodoStore = create(
  persist<TodoStore>(
    (set) => ({
      todos: todoData,
      filter: "all",
      nextId: todoData.length + 1,
      setTodos: (todos) => set({ todos }),
      setFilter: (filter) => set({ filter }),
      handleClickCheck: (id) =>
        set((state) => ({
          todos: state.todos.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        })),
      handleClickDelete: (id) =>
        set((state) => ({
          todos: state.todos.filter((item) => item.id !== id),
        })),
      handleClickAll: () => set({ filter: "all" }),
      handleClickActive: () => set({ filter: "active" }),
      handleClickComplete: () => set({ filter: "complete" }),
      handleChange: (id, e) =>
        set((state) => ({
          todos: state.todos.map((item) =>
            item.id === id ? { ...item, todo: e.target.value } : item
          ),
        })),
      handleClickEdit: (id) =>
        set((state) => ({
          todos: state.todos.map((item) =>
            item.id === id
              ? { ...item, isEditable: !item.isEditable }
              : { ...item, isEditable: false }
          ),
        })),
      handleClickClear: () =>
        set((state) => ({
          todos: state.todos.filter((item) => !item.checked),
        })),
      createTodo: (text, date) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: state.nextId++,
              todo: text,
              date,
              checked: false,
              isEditable: false,
            },
          ],
        })),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;
