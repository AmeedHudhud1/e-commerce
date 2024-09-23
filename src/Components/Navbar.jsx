import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-secondary bg-gradient">
        <div className="container d-flex h-auto ">
        

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


    



            </ul>
          </div>



        </div>

      </nav>
    </>
  );
}
