// 리엑트 모듈에서 훅(Hook) 가져오기 : use~로 시작, 여기도 구조분해할당임!
import { useState, useEffect } from 'react'
import TheLoader from './components/TheLoader'

export interface Root {
  total: number
  users: User[]
}

export interface User {
  id: string
  name: string
  age: number
  isValid: boolean
  emails: string[]
  photo?: Photo
}

export interface Photo {
  name: string
  size: number
  mimeType: string
  url: string
}

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const [count, setCount] = useState(31) // 초기값이 있는 경우에는 따로 타입 지정 필요 없다
  // 반응형 데이터, 초기값 세팅, 배열 데이터의 구조분해할당
  // [데이터와 데이터를 갱신하는 함수]
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  // useEffect(콜백, 의존성 배열)
  useEffect(() => {
    getUsers()
  }, [])

  function increase() {
    // count += 1;
    setCount(count + 1)
    // console.log(count);
  }


  async function getUsers() {
    try {
      // 의도적으로 시간 늦추는 방법, 프로미스 객체,
      await new Promise(resolve => setTimeout(resolve, 2000))
      // 외부 요인(에러 발상할 가능성이 있는 코드) = 패치 함수쪽
      const res = await fetch('https://api.heropy.dev/v0/users')
      const data = await res.json()
      console.log('이행, 응답결과', data)
      setUsers(data.users)
    } catch (error) {
      // 에러 클래스의 에러 객체, instanceof는 JS 문법, 타입 가드 필요???

      if (error instanceof Error) {
        const message = '폭발!'
        console.error('에러 발생', message)
        setMessage(message)
      }
    } finally {
      // false로 바꾸는 이유: 
      setLoading(false)
    }
  }


  return (
    <>
      <div>{count}명</div>
      <button onClick={increase}>증가+</button>
      {/* <div>{loading ? '로딩 중...' : ''}</div> */}
      <div>{loading && <TheLoader />}</div>
      <div>{message}</div>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
