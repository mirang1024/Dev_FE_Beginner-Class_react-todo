import type { Todo } from '../App'
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
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
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
  console.error('수정 실패', error)
  setTodo(todo)
}

// 할 일 항목 삭제 함수 (낙관적 업데이트)
async function deleteMe() {
	deleteTodo(todo)
	// 서버에 삭제 요청
  console.log('서버에 삭제 요청')
  try {
    await fetch(
      // 삭제할 값(id)를 엔드포인트에 템플릿 문자열로 명시
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/${todo.id}`,
      {
        // 삭제할 메소드 추가
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          username: 'Grepp_KDT4_ParkYoungWoong'
        },
      }
    )
  } catch (error) {
    console.error('삭제 실패', error)
    getTodos()
  }
} 


  return (
    <li>
      {todo.title}
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
          onKeyDown={keydownHandler}
      />
      <button onClick={() => deleteMe()}>삭제</button>
    </li>
  )
}
}