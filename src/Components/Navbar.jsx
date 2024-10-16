import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User";

export default function Navbar() {
  const { role, setRole } = useContext(UserContext);
  const navigate = useNavigate();

  const changeRole = (newRole, redirectPath) => {
    localStorage.setItem('role', newRole);
    setRole(newRole); 
    navigate(redirectPath);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
        <div className="container-fluid">
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/profile">
                  Profile
                </Link>
              </li>

              {/* Conditionally render the Role dropdown if the role is Admin */}
              {role === 'Admin' && (
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
                        onClick={() => changeRole('admin', '/admin/products')} // Change to admin role and navigate
                        to="/admin/products" // Optional: Add this to ensure navigation
                      >
                        Admin
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        onClick={() => changeRole('user', '/')} // Change to user role and navigate
                        to="/" // Optional: Add this to ensure navigation
                      >
                        User
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
