import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useAppDispatch } from './hooks'
import { addTodo, addTimestamp } from './slices/todo'

// rtk-quer hooks 參考：https://redux-toolkit.js.org/tutorials/rtk-query#use-the-query-in-a-component
import { useGetTodoByIdQuery } from './services/todoApiService'

const Wrapper = styled.div`
  padding: 1.5rem;
`

const Title = styled.h2`
  font-weight: 900;
  margin-top: 2rem;
`

const NoteInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding-left: .5rem;
  box-sizing: border-box;
`

const SubmitBtn = styled.button`
  width: 100%;
  box-sizing: border-box;
  height: 40px;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  border: 0;
  font-weight: 900;
  margin-top: 1rem;

  :active {
    background: #000000be;
  }
`

const Item = styled.div`
  margin-top: 1rem;

  > b {
    margin-right: .5rem;
  }
`


function App() {

  const todoReducer = useAppSelector(state => state.todoReducer)
  const todoList = todoReducer.todoList

  const dispatch = useAppDispatch()

  const [text, setText] = useState('')
  
  // 以下客製的 useXXXXQuery hook 可以取得下列 endpoints
  const { data, error, isLoading } = useGetTodoByIdQuery('2')

  return (
    <Wrapper>
      <Title>TODO LIST</Title>
      <NoteInput type="text" value={text} onChange={(e) => {
        setText(e.target.value)
      }} />
      <SubmitBtn onClick={() => {
        if (text === '') {
          alert('請輸入內容')
          return;
        }
        dispatch(addTodo(text))
        setText('')
      }}>
        Submit
      </SubmitBtn>
      <SubmitBtn onClick={() => {
        dispatch(addTimestamp())
      }}>
        Record Timestamp
      </SubmitBtn>
      <Title>List</Title>

      {
        todoList.map((data, index) => {
          return (
            <Item key={data}>
              <b>{ index + 1 }</b>
              { data }
            </Item>
          )
        })
      }

      <Title>Get Todo API</Title>
      {
        error ? (
          <div>Oh no, there was an error</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : data ? (
          <div>
            <p>todo id: {data.id}</p>
            <p>todo title: {data.title}</p>
          </div>
        ) : null
      }

    </Wrapper>
  );
}

export default App;