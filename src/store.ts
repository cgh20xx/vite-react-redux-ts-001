import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from './slices/todo'
// import { loggerMiddleware, secoundMiddleware } from './middleware'
import { todoApi } from './services/todoApiService'

console.log({ todoApi });

export const store = configureStore({
  // 補充：RTK 會將 reducer 傳遞給 combineReducers()，不再需要使用 combineReducers 包多個 reducer。
  reducer: {
    todoReducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware()
      // .concat(loggerMiddleware)
      // .concat(secoundMiddleware)
      .concat(todoApi.middleware)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch