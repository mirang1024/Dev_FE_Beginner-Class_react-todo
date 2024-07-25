// 리엑트 모듈에서 훅(Hook) 가져오기 : use~로 시작, 여기도 구조분해할당임!
import React, { useState, useEffect } from 'react'

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

  function increase() {
    // count += 1;
    setCount(count + 1)
    // console.log(count);
  }

  useEffect(() => {
    getUsers()
  }, [])

  // 호이스팅됨
  async function getUsers() {
    const res = await fetch('https://api.heropy.dev/v0/users')
    const data = await res.json()
    console.log('응답결과', data)
    setUsers(data.users)
  }

  return (
    <>
      <div>{count}명</div>
      <button onClick={increase}>증가+</button>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </>
  )
}
