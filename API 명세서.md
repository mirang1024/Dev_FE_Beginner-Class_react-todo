## API 사용법

요청 주소(Endpoint)

```curl
https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
```

모든 API 요청(Request)은 `headers` 정보가 꼭 포함돼야 합니다!  
`username`은 `KDTX_ParkYoungWoong`와 같이 본명을 포함해야 합니다!  
확인할 수 없는 사용자의 DB 정보는 임의로 삭제될 수 있습니다!

API 사용 예시:

```js
async function createTodo() {
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': '5X8Z1k7M2vU5Q',
      'username': 'Grepp_KDT4_ParkYoungWoong'
    },
    body: JSON.stringify({
      title: '아침 먹기!'
    })
  })
  const json = await res.json()
  console.log(json)

  return json
}
```

### 목록 조회

전체 할 일 목록을 조회합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'GET'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = Todo[] // 할 일 목록

interface Todo {
  id: string // 할 일 ID
  order: number // 할 일 순서
  title: string // 할 일 제목
  done: boolean // 할 일 완료 여부
  createdAt: string // 할 일 생성일
  updatedAt: string // 할 일 수정일
}
```

```json
[
  {
    "id": "mnIwaAPIAE1ayQmqekiR",
    "order": 0,
    "title": "JS 공부하기",
    "done": false,
    "createdAt": "2021-10-28T05:18:51.868Z",
    "updatedAt": "2021-10-28T05:18:51.868Z"
  },
  {
    "id": "tMzPImGoWtRdJ6yyVv2y",
    "order": 1,
    "title": "과제 PullRequest(PR) 생성",
    "done": true,
    "createdAt": "2021-10-28T04:16:53.980Z",
    "updatedAt": "2021-10-28T09:40:17.955Z"
  },
  {
    "id": "Rq8BebKihCgteHHhMIRS",
    "order": 2,
    "title": "API 스터디",
    "done": false,
    "createdAt": "2021-10-28T04:17:02.510Z",
    "updatedAt": "2021-10-28T04:17:02.510Z"
  }
]
```

### 항목 추가

할 일 항목을 새롭게 추가합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos
  \ -X 'POST'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "KDT 과정 설계 미팅",
  "order": 2
}
```

응답 데이터 타입 및 예시:

```ts
interface ResponseValue {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}
```

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "order": 0,
  "title": "KDT 과정 설계 미팅",
  "done": false,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 수정

특정 할 일 항목을 수정합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  title: string // 할 일 제목 (필수!)
  done: boolean // 할 일 완료 여부 (필수!)
  order?: number // 할 일 순서
}
```

```json
{
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2
}
```

응답 데이터 타입 및 예시:

```json
{
  "id": "7P8dOM4voAv8a8cfoeKZ",
  "title": "Bootstrap 스타일 추가",
  "done": false,
  "order": 2,
  "createdAt": "2021-10-29T07:20:02.749Z",
  "updatedAt": "2021-10-29T07:20:02.749Z"
}
```

### 항목 삭제

특정 할 일 항목을 삭제합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/:todoId
  \ -X 'DELETE'
```

요청 데이터 타입 및 예시:

- 없음

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true
```

### 항목 일괄 삭제

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/deletions
  \ -X 'DELETE'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  todoIds: string[] // 삭제할 할 일 ID 목록 (필수!)
}
```

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true
```

### 목록 순서 변경

할 일 목록의 순서를 변경합니다.

```curl
curl https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder
  \ -X 'PUT'
```

요청 데이터 타입 및 예시:

```ts
interface RequestBody {
  todoIds: string[] // 새롭게 정렬할 할 일 ID 목록 (필수!)
}
```

```json
{
  "todoIds": [
    "mnIwaAPIAE1ayQmqekiR",
    "tMzPImGoWtRdJ6yyVv2y",
    "GHrvr3LaPx1g7y2sNuaC",
    "Rq8BebKihCgteHHhMIRS"
  ]
}
```

응답 데이터 타입 및 예시:

```ts
type ResponseValue = true // 순서 변경 여부
```