import { useState } from "react";

import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} from "../Services/model/TodoApi";

export const useApp = () => {
  const [todoData, setTodoData] = useState({
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
        id: todoData._id,
        title: todoData.title,
        description: todoData.description,
      })
        .unwrap()
        .then((data) => {
          setTodoData({
            title: "",
            description: "",
          });
        });
      // force re-fetches the data
      refetch();
    } else {
      addTodo({
        title: todoData.title,
        description: todoData.description,
      })
        .unwrap()
        .then((data) => {
          setTodoData({
            title: "",
            description: "",
          });
        });
      // force re-fetches the data
      refetch();
    }
  };
  const DeleteTodoHandler = (id) => {
    console.log(id);
    deleteTodo(id)
      .unwrap()
      .then((data) => {
        console.log("Todo deleted");
      })
      .catch((err) => {
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
