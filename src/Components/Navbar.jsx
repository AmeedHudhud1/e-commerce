import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function Navbar() {
  const { role, role2, setRole2,setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const changeRole = (newRole, redirectPath) => {
    setRole2(newRole); 
    navigate(redirectPath);
  };
  return (
    <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
      <div className="container-fluid">
        <div>
          {
            
            role == "" ?
            (
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" onClick={()=>{
                setRole2("")
                setRole("")
              }} to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" to="/register">
                Register
              </Link>
            </li>
          </ul>
            ): role == "User" ?
            (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active ms-3 text-white fw-bold" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" onClick={()=>{
                localStorage.setItem("role","")
                localStorage.setItem("token","")  
                setRole("")
                setRole2("")
              }} to="/login">
                Logout
              </Link>
            </li>
          </ul>
            ):(
              
              role2 == 'Admin' ?  (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" to="/categorys">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" to="/profile">
                Orders
              </Link>
            </li>

            
              <li className="nav-item dropdown hover-dropdown ms-4">
                <a
                  className="nav-link dropdown-toggle text-white fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Role
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/products"
                      onClick={() => setRole2('Admin')}
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => setRole2('User')}
                    >
                      User
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" onClick={()=>{
                localStorage.setItem("role","")
                localStorage.setItem("token","")
                setRole("")
                setRole2("")
              }} to="/login">
                Logout
              </Link>
            </li>
            
          </ul>
              ):(
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active ms-3 text-white fw-bold" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" onClick={()=>{
                localStorage.setItem("role","")
                localStorage.setItem("token","")  
                setRole("")
                setRole2("")
              }} to="/login">
                Logout
              </Link>
            </li>

            <li className="nav-item dropdown hover-dropdown ms-4">
                <a
                  className="nav-link dropdown-toggle text-white fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Role
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/products"
                      onClick={() => setRole2('Admin')}
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={() => setRole2('User')}
                    >
                      User
                    </Link>
                  </li>
                </ul>
              </li>
          </ul>
              )

              
            )
            }

        </div>
      </div>
    </nav>
  );
}
