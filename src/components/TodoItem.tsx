import type { Todo } from '../App'
import { useState } from 'react'

// abc를 todo로 바꾸기
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
// 키보드 이벤트 타입은 타입이라 따로 안 가져와도 된다 
// async 추가하기!
async function keydownHandler(event : React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === 'Enter') {
    updateTodo()
  }
}

// 생서하는 추상화 함수 만들기
async function updateTodo() {
  // 낙관적 업데이트 수정된 내용 바로 바꾸고 나중에 가져오는
  setTodo({ ...todo, title })
  console.log('서버로 전송!', title)
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await fetch(
    // 수정할 값(id)를 엔드포인트에 명시해줘야한다. 또한 템플릿 문자열로 수정해야한다.
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todo.id}`,
      {
        // 수정할 메소드 추가
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: '5X8Z1k7M2vU5Q',
          //  username: 'Grepp_KDT4_ParkYoungWoong'
          username: 'Grepp_KDT4_ParkYoungWoong'
      },
      body: JSON.stringify({
        title,
        done: todo.done
      })
    }
  )
  // 수정한 객체가 데이터로 들어옴
  const updatedTodo: Todo = await res.json()
  // 바뀐 결과 보기
  console.log(updatedTodo, title)
} catch (error) {
  console.error(error)
  setTodo(todo)
}
  // 수정된 데이터 가져온 후 반영
  // setTodo({updatedTodo})
}

async function deleteMe() {
  console.log('deleteMe!!')
  await fetch(
    // 수정할 값(id)를 엔드포인트에 명시해줘야한다. 또한 템플릿 문자열로 수정해야한다.
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/${todo.id}`,
    {
      // 수정할 메소드 추가
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        apikey: '5X8Z1k7M2vU5Q',
        //  username: 'Grepp_KDT4_ParkYoungWoong'
        username: 'Grepp_KDT4_ParkYoungWoong'
      },
    }
  )
  // 가져온 데이터를 확인하는 건 생략해도 된다
  // const updatedData = await res.json()
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
      <button onClick={() => deleteMe()}>삭제</button>
    </li>
  )
}

// // form을 활용한 경우
// return (
//   <li>
//     <form onSubmit={handleSubmit}>
//       {todo.title}
//       <input
//         type="text"
//         defaultValue={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />
//       <button type="submit">수정</button>
//     </form>
//   </li>
// )
// // 디폴트 벨류가 잇으면 온체인지로 할 필요가 없다

