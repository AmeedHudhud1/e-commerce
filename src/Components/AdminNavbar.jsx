import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminNavbar({ setRole }) {
  const navigate = useNavigate(); // Get the navigate function

  const changeRole = (newRole, redirectPath) => {
    localStorage.setItem('role', newRole); 
    setRole(newRole); // Update the role state in the parent component
    navigate(redirectPath); // Navigate to the specified path
  };

  return (
    <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
      <div className="container-fluid">
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/admin/products">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/admin/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active ms-3 text-white fw-bold" aria-current="page" to="/admin/profile">
                Profile
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
          </ul>
        </div>
      </div>
    </nav>
  );
}
