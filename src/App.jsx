import React, { useContext, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './Pages/User/Home';
import Root from './Route/Root';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRoot from './Route/AdminRoot';
import Products from './Pages/Admin/Products/Products';
import Orders from './Pages/Admin/Orders';
import Profile from './Pages/Profile';
import RoleToggleButton from './Components/RoleToggleButton ';
import UserContextProvider, { UserContext } from './context/User';
import AddProduct from './Pages/Admin/Products/addProduct';
import UpdateProduct from './Pages/Admin/Products/updateProduct';
import DeleteProduct from './Pages/Admin/Products/deleteProduct';
const App = () => {
  const router = createBrowserRouter([
    {
      element:<Root />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/profile',
          element: <Profile />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
    {
      element: <AdminRoot />,
      children: [
        {
          path: '/admin/products',
          element: <Products />,
        },
        {
          path: '/admin/orders',
          element: <Orders />,
        },
        {
          path: '/admin/profile',
          element: <Profile />,
        },
        {
          path: '/admin/product/add',
          element: <AddProduct/>
        },
        {
          path: '/admin/product/update',
          element: <UpdateProduct/>
        },
        {
          path: '/admin/product/delete',
          element: <DeleteProduct/>
        },
       
      ],
    },
  ]);

  return (
    <>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
      
      
      <ToastContainer />
    </>
  );
};

export default App;
