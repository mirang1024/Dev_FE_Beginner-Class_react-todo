import type { Todo } from '@/routes/Main'
import { useState } from 'react'

export default function TodoItem({
  todo,
  setTodo,
  deleteTodo
}: {
  todo: Todo;
  setTodo: (updatedTodo: Todo) => void
  deleteTodo: (todoToDelete: Todo) => void
}) {
  const [title, setTitle] = useState(todo.title)
async function keydownHandler(event : React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    updateTodo()
  }
}

async function updateTodo() {
  setTodo({ ...todo, title })
  console.log('서버로 전송!', title)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
          username: 'FE1_ChoiMiRang'
      },
      body: JSON.stringify({
        title,
        done: todo.done
      })
    }
  )
  const updatedTodo: Todo = await res.json()
  console.log(updatedTodo, title)
} catch (error) {
  console.error(error)
  setTodo(todo)
}
}

async function deleteMe() {
  console.log('deleteMe!!')
  await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
    {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        apikey: 'KDT9_AHMq2s7n',
        username: 'FE1_ChoiMiRang'
      },
    }
  )
  deleteTodo(todo)
}


  return (
    <li>
      {todo.title}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
          onKeyDown={keydownHandler}
      />
      <button onClick={deleteMe}>삭제</button>
    </li>
  )
}
