import { useNavigate, useParams } from 'react-router-dom'
import styles from './TodoItemModal.module.css'
import { useTodosStore } from '@/stores/todos'


export default function TodoItemModal() {
  const navigate = useNavigate()
  // index.tsx의 path에서 가져오는 이름!
  const { todoId } = useParams()
  const todos = useTodosStore(state => state.todos)
  
  // todos.find(todo => {
  //   // if(todo.id === todoId) {
  //   //   return true
  //   // }
  //   return todo.id === todoId
  // })

  const currentTodo = todos.find(todo => todo.id === todoId)

  function offModal() {
    navigate('/')
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
        <h2>모달창 입니다</h2>
        <h3>Todo ID: {todoId}</h3>
      </div>
    </div>
  )
}