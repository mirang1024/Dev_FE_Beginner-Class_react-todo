import { useState } from "react"

export default function TodoCreator({ getTodos }: { getTodos: () => void }) {
  const [title, setTitle] = useState('')

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      console.log('title:', title)
      createTodo()
    }
  }

  async function createTodo() {
    await fetch( 
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos`,
      {
        // 수정할 메소드 추가
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: 'KDT9_AHMq2s7n',
           username: 'FE1_ChoiMiRang'
        },
      body: JSON.stringify({
        title
      })
    }
  )
  // const newTodo: Todo = await res.json()
  // 새로 작성된 항목만 추가하는 로직
  // todos.splice(0, 0, newTodo)
  getTodos()
}

  return (
    <div>
      <input
        value={title}
        // 이것을 통해 양방향으로 
        onChange={e => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="새로운 할 일을 작성하세요~"
      />
    </div>
  )
}