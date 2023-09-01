import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Todo } from "../../todo";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),

  tagTypes: ["Todo"],

  endpoints: (builder) => ({
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (todo: Todo) => ({
        url: "/tasks",
        method: "POST",
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"],
    }),

    getAllTodos: builder.query<Todo[], void>({
      query: () => "/tasks",
      providesTags: ["Todo"],
    }),

    updateTodo: builder.mutation<Todo, Partial<Todo>>({
      query: ({ _id, ...todo }) => ({
        url: `/tasks/${_id}`,
        method: "PATCH",
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation<void, String>({
      query: (_id) => ({
        url: `/tasks/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllTodosQuery,
  useUpdateTodoMutation,
} = todoApi;
