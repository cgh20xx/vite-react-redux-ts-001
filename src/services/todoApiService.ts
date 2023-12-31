// 參考：https://redux-toolkit.js.org/tutorials/rtk-query

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// 新增 interface 給 builder.query，如此呼叫 hook 拿到的 data 才會自動提示屬性及檢查型別
interface TodoData {
  userId:	number
  id: number
  title: string
  completed: boolean
}

// Define a service using a base URL and expected endpoints
// 如果有多個 createApi，那麼 reducerPath 為必填，且不可重覆，若省略 reducerPath，預設值為：api。
export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getTodoById: builder.query<TodoData, string>({
      query: (id) => `todos/${id}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoByIdQuery } = todoApi