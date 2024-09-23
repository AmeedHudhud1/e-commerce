import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Root from './Route/Root'
import NotFound from './Pages/NotFound'
import Login from './Pages/Login/Login'
import Register from './Pages/Register/Register'

const router = createBrowserRouter([
  {
    element:<Root/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'*',
        element:<NotFound/>
      },
    ]
  }
])
export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}
