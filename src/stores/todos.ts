// 할 일 todo 데이터 상태 관리 store
import { create } from "zustand";
import { combine } from "zustand/middleware";


export type Todos = Todo[]

export interface Todo {
  id: string
  order: number
  title: string
  done: boolean
  createdAt: string
  updatedAt: string
}

export const useTodosStore = create(
  combine(
    {
      todos: [] as Todos,
      message: '',
      loading: true,
    }, 
    function (set, get) {
        async function getTodos() {
          try {
            const res = await fetch(
              'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
              {
                headers: {
                  'content-type': 'application/json',
                  apikey: 'KDT9_AHMq2s7n',
                  username: 'FE1_ChoiMiRang'
                }
              }
            )
            const data = await res.json()
            console.log('이행, 응답결과', data)
            set({
              todos: data
            })
          } catch (error) {
      
            if (error instanceof Error) {
              const message = '서버 폭발!'
              console.error('에러 발생', message)
              set({
                message
              })
            }
          } finally {
            set({
              loading: false
            })
          }
        }
        // setTodo(updatedTodo: Todo) {
        //   set(({ todos }) => ({
        //     todos: todos.map(todo => {
        //       if (todo.id === updatedTodo.id) {
        //         return updatedTodo
        //       }
        //       return todo
        //     })
        //   }))
        // },
        // deleteTodo(todoToDelete: Todo) {
        //   set(({ todos }) => { 
        //     return {
        //       todos: todos.filter(todo => todo.id !== todoToDelete.id)
        //     }
        //   })
        // },
        async function updateTodo(updatedTodo: Todo) {
          try {
            await fetch(
              `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${updatedTodo.id}`,
              {
                method: 'PUT',
                headers: {
                  'content-type': 'application/json',
                  apikey: 'KDT9_AHMq2s7n',
                  username: 'FE1_ChoiMiRang'
              },
              body: JSON.stringify({
                title: updatedTodo.title,
                done: updatedTodo.done
              })
            }
          )
          getTodos()
        } catch (error) {
          console.error(error)
        }
        }
        async function deleteTodo(deletedTodo: Todo) {
          await fetch(
            `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${deletedTodo.id}`,
            {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json',
                apikey: 'KDT9_AHMq2s7n',
                username: 'FE1_ChoiMiRang'
              },
            }
          )
          getTodos()
        }
      return {
        getTodos,
        updateTodo,
        deleteTodo
      }
    }      
  )
)

