import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todoApi = createApi({
  reducerPath: "todoApi",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://jsonplaceholder.typicode.com",
    baseUrl: "http://localhost:3000",
  }),
  endpoints: (builder) => ({
    addTodo: builder.mutation({
      query: (todo) => ({
        url: "/tasks",
        method: "POST",
        body: JSON.stringify({
          title: todo.title,
          description: todo.description,
          completed: false,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Todo"],
    }),
    getAllTodos: builder.query({
      query: () => "/tasks",
      providesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: ({ id, ...todo }) => ({
        url: `/tasks/${id}`,
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
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
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
