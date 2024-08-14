import type { Todo } from '@/stores/todos';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTodosStore } from '@/stores/todos';


export default function TodoItem({ todo }: { todo: Todo }) {
  const [title, setTitle] = useState(todo.title)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const deleteTodo = useTodosStore(state => state.deleteTodo)

useEffect(() => {
  setTitle(todo.title)
  structuredClone(todo.done)
  // 의존송/종속성 배열, todo객체가 변경될 때 콜백함수 호출
}, [todo])

async function keydownHandler(event : React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    updateTodo({
      ...todo,
      title
    })
  }
}


  return (
    <li>
      <Link to={`${todo.id}`}>{todo.title}</Link>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteTodo(todo) }>삭제</button>
    </li>
  )
}
