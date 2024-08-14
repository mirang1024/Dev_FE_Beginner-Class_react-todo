import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import {router} from './routes'



ReactDOM.createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router}/>
)


;(async () => {
  const res = await fetch('/api/hello', {
    method: 'POST'
  })
  const data = await res.json()
  console.log('/api/hello :::', data)
})()

