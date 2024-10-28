import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Categories.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function UpdateCategory() {
  const [CategoryId, setCategoryId] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://ecommercent.runasp.net/api/Category/${CategoryId}`
      );
      if (response.data) {
        const category = response.data.category;
        formik.setValues({
          name: category.name || "",
          description: category.description || "",
        });
        setShowForm(true);
        toast.success("Category found. You can now update it.", {
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
      toast.error("Category not found. Please enter a valid category ID.", {
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

  const handleForm = async (values) => {
    console.log(values);
    try {
      const response = await axios.put(
        `https://ecommercent.runasp.net/api/Category/${CategoryId}`,
        values
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Category updated successfully", {
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
      console.error("Error updating category:", error);
      toast.error("Error updating category. Please try again.", {
        position: "top-right",
        autoClose: 4000,
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

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"),
    description: Yup.string().required("Category description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm(values);
    },
  });

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
              to="/categorys"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              All Categories
            </Link>
            <Link
              to="/category/add"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Add Categorie
            </Link>
            <Link
              to="/category/update"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Update Categorie
            </Link>
            <Link
              to="/category/delete"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Delete Categorie
            </Link>
          </ul>
        </div>

        <div className="col-md-9 categorys-section">
          {!showForm ? (
            <div className={`${style.main} bg-dark-subtle`}>
              <div className={`${style.wrapper} bg-secondary bg-gradient`}>
                <h1>Find Category to Update</h1>
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
                  Fetch Category
                </button>
              </div>
            </div>
          ) : (
            <div className={`${style.main} bg-dark-subtle`}>
              <div className={`${style.wrapper} bg-secondary bg-gradient`}>
                <form onSubmit={formik.handleSubmit}>
                  <h1>Update Category</h1>

                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      placeholder="Category Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      name="name"
                      id="name"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className={style.error}>{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      placeholder="Category Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      name="description"
                      id="description"
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div className={style.error}>
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </div>
                  <button type="submit" className="mt-4">
                    Update Category
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
