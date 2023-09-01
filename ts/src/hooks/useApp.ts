import { useState } from "react";

import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} from "../Services/model/TodoApi";
import { Todo } from "../todo";

export const useApp = () => {
  const [todoData, setTodoData] = useState<Todo>({
    title: "",
    description: "",
    completed: false,
    _id: "",
  });
  const [deleteTodo] = useDeleteTodoMutation();
  const { data, error, isLoading, isFetching, refetch } = useGetAllTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const handleAdd = () => {
    if (todoData._id) {
      updateTodo({
        _id: todoData._id,
        title: todoData.title,
        description: todoData.description,
      })
        .unwrap()
        .then((data: Todo) => {
          setTodoData({
            title: "",
            description: "",
            _id: "",
            completed: false,
          });
        });
      // force re-fetches the data
      refetch();
    } else {
      addTodo({
        title: todoData.title,
        description: todoData.description,
        completed: todoData.completed,
        _id: todoData._id,
      })
        .unwrap()
        .then((data: Todo) => {
          setTodoData({
            title: "",
            description: "",
            _id: "",
            completed: false,
          });
        });
      // force re-fetches the data
      refetch();
    }
  };
  const DeleteTodoHandler = (id: String) => {
    console.log(id);
    deleteTodo(id)
      .unwrap()
      .then(() => {
        console.log("Todo deleted");
      })
      .catch((err: any) => {
        console.log(err);
      });
  };
  return {
    todoData,
    setTodoData,
    DeleteTodoHandler,
    handleAdd,
    data,
    error,
    isLoading,
    isFetching,
  };
};
