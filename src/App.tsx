import { useState, useEffect, Fragment } from 'react'
import TheLoader from './components/TheLoader'
import TodoItem from './components/TodoItem'
import TodoCreator from './components/TodoCreator'


export type Todos = Todo[]

export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export default function App() {
  const [todos, setTodos] = useState<Todos>([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTodos()
  }, [])


  async function getTodos() {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
        {
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT9_AHMq2s7n',
            username: 'FE1_ChoiMiRang'
          }
        }
      )
      const data = await res.json()
      console.log('이행, 응답결과', data)
      setTodos(data)
    } catch (error) {

      if (error instanceof Error) {
        const message = '서버 폭발!'
        console.error('에러 발생', message)
        setMessage(message)
      }
    } finally {
      setLoading(false)
    }
  }
  

  function setTodo(updatedTodo: Todo) {
    setTodos(todos => {
      return todos.map(todo => {
        if (todo.id === updatedTodo.id) {
          return updatedTodo
        }
        return todo
      })
    })
  }

  function deleteTodo(todoToDelete: Todo) {
    setTodos(todos => {
      return todos.filter(todo => todo.id !== todoToDelete.id)
    })
  }

  return (
    <>
      <TodoCreator getTodos={getTodos} />
        <div>{loading && <TheLoader />}</div>
        <div>{message}</div>
        <ul>
          {todos.map(todo => (
            <Fragment key={todo.id}>
              <TodoItem
              todo={todo}
              setTodo={setTodo}
              deleteTodo={deleteTodo}
              />
            </Fragment>
          ))}
        </ul>
    </>
  )
}
