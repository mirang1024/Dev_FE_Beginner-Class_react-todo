import { useNavigate, useParams } from 'react-router-dom'
import styles from './TodoItemModal.module.css'
import { useTodosStore } from '@/stores/todos'
import { useState } from 'react'


export default function TodoItemModal() {
  const navigate = useNavigate()
  // index.tsx의 path에서 가져오는 이름!
  const { todoId } = useParams()
  const todos = useTodosStore(state => state.todos)
  const updateTodo = useTodosStore(state => state.updateTodo)
  const deleteTodo = useTodosStore(state => state.deleteTodo)
  const currentTodo = todos.find(todo => todo.id === todoId)
  const {title, setTitle} = useState(currentTodo?.title || '')
  const {done, setDone} = useState(currentTodo?.done || false)


  function offModal() {
    navigate('/')
  }

  function updateCurrentTodo() {
    if (currentTodo) {
      updateTodo({
        ...currentTodo,
        title
      })
    }
  }

  function deleteCurrentTodo() {
    if (currentTodo) {
      deleteTodo(currentTodo)
      offModal()
    }
  }

  return (
    <div className={styles.modal}>
      {/* 모달 창 밖을 클릭하면 모달창이 꺼진다는 추상화를 해서 ui를 바로 보고 이해할 수 있다 */}
      <div
      className={styles.overlay}
      onClick={offModal}></div>
      <div className={styles.contents}>
        <div>{currentTodo?.title}</div>
        <div>{currentTodo?.createdAt}</div>
        <input
          type="checkbox"
          checked={done}
          onChange={e => {
            setDone(e .target.checked)
            if (currentTodo) {
              updateTodo({
                ...currentTodo,
                done: e.target.checked
              })
            }
          }}
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={updateCurrentTodo}>수정</button>
        <button onClick={deleteCurrentTodo}>삭제</button>
      </div>
    </div>
  )
}