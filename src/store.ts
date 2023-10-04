import { configureStore, combineReducers } from '@reduxjs/toolkit'
import todoReducer from './slices/todo'
// import { loggerMiddleware, secoundMiddleware } from './middleware'
import { todoApi } from './services/todoApiService'

console.log({ todoApi });

// 因一個 store 會有多個 reducer， 所以使用 combineReducers 集結所有 reducer
const reducers = combineReducers({
  todoReducer,
  [todoApi.reducerPath]: todoApi.reducer,
})

export const store = configureStore({
  reducer: reducers,
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

// 導入 middleware 後 RootState 的 type 需修改為使用 combineReducers 的回傳值，store 才不會報錯。
export type RootState = ReturnType<typeof reducers>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch