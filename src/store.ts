import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slices/todo'
import { loggerMiddleware } from './middleware'

export const store = configureStore({
  reducer: {
    todoReducer
  },
  middleware(getDefaultMiddleware) {
    getDefaultMiddleware().concat(loggerMiddleware)
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch