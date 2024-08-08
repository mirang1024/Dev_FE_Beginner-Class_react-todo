import { Outlet } from 'react-router-dom'
import TheLoader from '@/components/TheLoader'
import TodoItem from '@/components/TodoItem'
import TodoCreator from '@/components/TodoCreator'
import { useTodosStore } from '@/stores/todos'
import { useEffect, Fragment } from 'react';

export default function App() {
  // useTodosStore(function (스토어) { return 스토어.상태 })
  const todos = useTodosStore(state => state.todos)
  const message = useTodosStore(state => state.message)
  const loading = useTodosStore(state => state.loading)
  const getTodos = useTodosStore(state => state.getTodos)

  useEffect(() => {
    getTodos()
  }, [])

  function setTodo(updatedTodo: Todo) {
    // setTodos(todos => {
    //   return todos.map(todo => {
    //     if (todo.id === updatedTodo.id) {
    //       return updatedTodo
    //     }
    //     return todo
    //   })
    // })
  }

  function deleteTodo(todoToDelete: Todo) {
    // setTodos(todos => {
    //   return todos.filter(todo => todo.id !== todoToDelete.id)
    // })
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
        <Outlet/>
    </>
  )
}
