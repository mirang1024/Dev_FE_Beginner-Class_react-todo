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
  getTodos()
}

  return (
    <div>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="새로운 할 일을 작성하세요~"
      />
    </div>
  )
}