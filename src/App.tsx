// 리엑트 모듈에서 훅(Hook) 가져오기 : use~로 시작, 여기도 구조분해할당임!
import React, { useState } from "react";

export default function App() {
  const [users, setUsers] = useState([
    { name: "Neo", age: 51 },
    { name: "Lewis", age: 22 },
    { name: "Evan", age: 18 },
  ]);

  // let count = 31;
  // 반응형 데이터, 초기값 세팅, 배열 데이터의 구조분해할당
  // [데이터와 데이터를 갱신하는 함수]
  const [count, setCount] = useState(31);
  function increase() {
    // count += 1;
    setCount(count + 1);
    console.log(count);
  }
  return (
    <>
      <div>{count}명</div>
      <button onClick={increase}>증가+</button>
      <ul>
        {users.map((user) => (
          <li key={user.name}>{user.name}</li>
        ))}
      </ul>
    </>
  );
}
