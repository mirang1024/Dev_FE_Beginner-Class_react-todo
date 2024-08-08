import { createBrowserRouter } from "react-router-dom";
import Main from './Main'
import TodoItemDetails from "./TodoItemDetails";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        // params에서 꺼내는 부분
        path: ':todoId',
        element: <TodoItemDetails />
      }
    ]
  }
])

