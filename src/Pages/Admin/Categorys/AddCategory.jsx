import { useFormik } from 'formik';
import React from 'react'
import { Link } from 'react-router-dom'
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import style from './Categories.module.css' 
import axios from 'axios';
export default function AddCategory() {

  const handleForm = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("Description", values.description);
    formData.append("Image", values.image); 
    
    try {
      const response = await axios.post(
        `https://ecommercent.runasp.net/api/Category`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 201) {
        toast.success("Category is created successfully", {
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
      console.log(response);
    } catch (error) {
      console.error("Error creating category:", error);
      if (error.response && error.response.data) {
        toast.error(`${error.response.data.error}`, {
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
      }else{
        toast.error("Error In Create Category")
      }
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Category name is required"), 
    description: Yup.string().required("Category description is required"), 
    image: Yup.mixed().required("Category image is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });
  return (
    <div className="container-fluid">
    <div className="row">
          <div className="col-md-3 sidebar-section bg-light p-4 rounded shadow-sm">
          <h5 className="mb-4 font-weight-bold text-primary">Categories</h5>
          <ul className="list-group">
            <Link to="/categorys" className="list-group-item list-group-item-action text-decoration-none">
              All Categories
            </Link>
            <Link to="/category/add" className="list-group-item list-group-item-action text-decoration-none">
              Add Categorie
            </Link>
            <Link to="/category/update" className="list-group-item list-group-item-action text-decoration-none">
              Update Categorie
            </Link>
            <Link to="/category/delete" className="list-group-item list-group-item-action text-decoration-none">
              Delete Categorie
            </Link>
          </ul>
        </div>

        <div className="col-md-9 products-section">
          <div className={`${style.main} bg-dark-subtle`}>
            <div className={`${style.wrapper} bg-secondary bg-gradient`}>
              <form onSubmit={formik.handleSubmit}>
                <h1>Create Category</h1>
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
                    value={formik.values.description} // Corrected key
                    onChange={formik.handleChange}
                    name="description" // Corrected key
                    id="description"
                  />
                  {formik.touched.description && formik.errors.description ? (
              <div className={style.error}>{formik.errors.description}</div>
            ) : null}
                </div>
                <div className={style["input-box"]}>
                  <label
                    htmlFor="image"
                    className={style["custom-file-upload"]}
                  >
                    Upload Category Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className={style["file-input"]}
                    onChange={(event) =>
                      formik.setFieldValue("image", event.target.files[0])
                    }
                  />
                  {formik.touched.image && formik.errors.image ? (
              <div className={style.error}>{formik.errors.image}</div>
            ) : null}
                </div>
                <button type="submit" className="mt-4">
                  Create Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
  )
}
