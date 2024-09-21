import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import Root from './Route/Root'
import NotFound from './Pages/NotFound'

const router = createBrowserRouter([
  {
    element:<Root/>,
    children:[
      {
        path:'/',
        element:<Home/>
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
