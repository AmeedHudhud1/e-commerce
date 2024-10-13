import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import UserContextProvider from './context/User.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </UserContextProvider>
)
