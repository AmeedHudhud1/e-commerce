import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Categories.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function DeleteCategory() {
  const [CategoryId, setCategoryId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.delete(
        `https://ecommercent.runasp.net/api/Category/${CategoryId}`
      );

      if (response.status === 200) {
        toast.success("Category has been successfully deleted.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Category not found:", error);
      toast.error("Category not found. Please enter a valid product ID.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <div
      className="container-fluid bg-dark-subtle"
      style={{ minHeight: "500px" }}
    >
      <div className="row">
        <div
          className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm"
          style={{ minHeight: "500px" }}
        >
          <h5 className="mb-4 font-weight-bold text-primary">Categories</h5>
          <ul className="list-group">
            <Link
              to="/admin/categorys"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              All Categories
            </Link>
            <Link
              to="/admin/category/add"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Add Categorie
            </Link>
            <Link
              to="/admin/category/update"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Update Categorie
            </Link>
            <Link
              to="/admin/category/delete"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Delete Categorie
            </Link>
          </ul>
        </div>
        <div className="col-md-9 products-section">
          <div className={`${style.main} bg-dark-subtle`}>
            <div className={`${style.wrapper} bg-secondary bg-gradient`}>
              <h1>Find Category to Delete</h1>
              <div className={style["input-box"]}>
                <input
                  type="text"
                  placeholder="Enter Category ID"
                  value={CategoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  id="CategoryId"
                />
              </div>
              <button onClick={fetchData} className="mt-4">
                Delete Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
