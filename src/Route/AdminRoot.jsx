import React from 'react'
import AdminNavbar from '../Components/AdminNavbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer'

export default function AdminRoot() {
  return (
    <div>
        <AdminNavbar/>
        <Outlet/>
        <Footer/>
    </div>
      )
}
