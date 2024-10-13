import React, { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Products.module.css";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function UpdateProduct() {
  const [productId, setProductId] = useState("");
  const [showForm, setShowForm] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://ecommercent.runasp.net/api/Product/${productId}`
      );
      if (response.data) {
        const product = response.data.product;
        console.group("product : " + product);
        formik.setValues({
          name: product.name || "",
          price: product.price || "",
          description: product.description || "",
          category: product.category || "",
          stock: product.stock || "",
        });
        setShowForm(true);
        toast.success("Product found. You can now update it.", {
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
      console.error("Product not found:", error);
      toast.error("Product not found. Please enter a valid product ID.", {
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
        `https://ecommercent.runasp.net/api/Product/${productId}`,
        values
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Product updated successfully", {
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
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.", {
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
    name: Yup.string().required("Product name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Product price is required"),
    description: Yup.string().required("Product description is required"),
    stock: Yup.number()
      .typeError("Stock must be a number")
      .integer("Stock must be an integer")
      .min(0, "Stock cannot be negative")
      .required("Stock is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      categoryName: "",
      stock: "",
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
          <h5 className="mb-4 font-weight-bold text-primary">Products</h5>
          <ul className="list-group">
            <Link
              to="/admin/products"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              All Products
            </Link>
            <Link
              to="/admin/product/add"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Add Product
            </Link>
            <Link
              to="/admin/product/update"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Update Product
            </Link>
            <Link
              to="/admin/product/delete"
              className="list-group-item list-group-item-action text-decoration-none"
            >
              Delete Product
            </Link>
          </ul>
        </div>

        <div className="col-md-9 products-section">
          {!showForm ? (
            <div className={`${style.main} bg-dark-subtle`}>
              <div className={`${style.wrapper} bg-secondary bg-gradient`}>
                <h1>Find Product to Update</h1>
                <div className={style["input-box"]}>
                  <input
                    type="text"
                    placeholder="Enter Product ID"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    id="productId"
                  />
                </div>
                <button onClick={fetchData} className="mt-4">
                  Fetch Product
                </button>
              </div>
            </div>
          ) : (
            <div className={`${style.main} bg-dark-subtle`}>
              <div className={`${style.wrapper} bg-secondary bg-gradient`}>
                <form onSubmit={formik.handleSubmit}>
                  <h1>Update Product</h1>

                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      placeholder="Product Name"
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
                      placeholder="Product Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      name="price"
                      id="price"
                    />
                    {formik.touched.price && formik.errors.price ? (
                      <div className={style.error}>{formik.errors.price}</div>
                    ) : null}
                  </div>

                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      placeholder="Product Description"
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

                  <div className={style["input-box"]}>
                    <select
                      value={formik.values.categoryName}
                      onChange={formik.handleChange}
                      name="category"
                      id="category"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>{" "}
                      <option value="2">Beauty</option>
                      <option value="3">Clothes</option>
                      <option value="4">Kitchen</option>
                      <option value="5">Phone</option>
                      <option value="6">Toys</option>
                    </select>
                    {formik.touched.category && formik.errors.category ? (
                      <div className={style.error}>
                        {formik.errors.category}
                      </div>
                    ) : null}
                  </div>

                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      placeholder="Stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      name="stock"
                      id="stock"
                    />
                    {formik.touched.stock && formik.errors.stock ? (
                      <div className={style.error}>{formik.errors.stock}</div>
                    ) : null}
                  </div>

                  <button type="submit" className="mt-4">
                    Update Product
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
