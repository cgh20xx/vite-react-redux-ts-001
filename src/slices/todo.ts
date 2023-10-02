import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  todoList: Array<string>
}

const initialState: InitialState = {
  todoList: ['test']
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    // 1. state -> 當下的狀態
    // 2. action -> 對應的動作
    addTodo: (state, action) => {
      state.todoList.push(action.payload)
    },
    addTimestamp: (state,) => {
      state.todoList.push(Date.now().toString())
    }
  }
})

export const { addTodo, addTimestamp } = todoSlice.actions

export default todoSlice.reducer
