import type { Todo } from '../App'
import { useState } from 'react'

export default function UserItem({ abc }: {abc: Todo}) {
  const [title, setTitle] = useState(abc.title)
// 키보드 이벤트 타입은 타입이라 따로 안 가져와도 된다 
function keydownHandler(event : React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    console.log('서버로 전송!', title)
    // await 서버로 전송(수정할 이름)
  }
}

  return (
    <li>
      {abc.title}
      {/* 타입속성은 기본 값이 생략 가능 */}
      <input
        value={title}
        // defaultValue={abc.name}
        onChange={(e) => setTitle(e.target.value)}
          onKeyDown={keydownHandler}
      />
    </li>
  )
}

