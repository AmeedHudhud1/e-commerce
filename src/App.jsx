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
import UserContextProvider, { UserContext } from './context/User';
import AddProduct from './Pages/Admin/Products/AddProduct';
import UpdateProduct from './Pages/Admin/Products/UpdateProduct';
import DeleteProduct from './Pages/Admin/Products/DeleteProduct';
import Categorys from './Pages/Admin/Categorys/Categorys';
import AddCategory from './Pages/Admin/Categorys/AddCategory';
import UpdateCategory from './Pages/Admin/Categorys/UpdateCategory';
import DeleteCategory from './Pages/Admin/Categorys/DeleteCategory';
import ProductsCategories from './Pages/Admin/Categorys/ProductsCategories ';
import ProductsDetails from './Pages/Admin/Products/ProductsDetails';
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
          path: '/products',
          element: <Products />,
        },
        {
          path: '/product/Details/:id',
          element: <ProductsDetails />,
        },
        {
          path: '/orders',
          element: <Orders />,
        },
        {
          path: '/product/add',
          element: <AddProduct/>
        },
        {
          path: '/product/update',
          element: <UpdateProduct/>
        },
        {
          path: '/product/delete',
          element: <DeleteProduct/>
        },
        {
          path: '/categorys',
          element: <Categorys />,
        },
        {
          path: '/category/add',
          element: <AddCategory/>
        },
        {
          path: '/category/update',
          element: <UpdateCategory/>
        },
        {
          path: '/category/delete',
          element: <DeleteCategory/>
        },
        {
          path: '/category/products/:Name',
          element: <ProductsCategories/>
        },
        {
          path: '*',
          element: <NotFound />,
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
