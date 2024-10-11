import React, { useState } from "react";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

export default function Register() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(20, "Must be 20 characters or less")
      .required("User Name is required"),
    firstName: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(10, "Must be 10 characters or less")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(5, "Must be at least 5 characters")
      .max(10, "Must be 10 characters or less")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Password is required"),
  });

  const handleForm = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post(
        "https://ecommercent.runasp.net/api/User/register",
        {
          userName: values.userName,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      toast.success("Registered successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoader(false);

      navigate("/login");
    } catch (error) {
      setLoader(false);
      console.error("Registration error:", error);

      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(`${err.description}`, {
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
        });
      } else {
        toast.error("Registration failed");
      }
    } finally {
      setLoader(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm(values);
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className={`${style.main} bg-dark-subtle`}>
      <div className={`${style.wrapper} bg-secondary bg-gradient`}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Register</h1>

          <div className={style["input-box"]}>
            <input
              type="text"
              value={formik.values.userName}
              onChange={formik.handleChange}
              placeholder="User Name"
              name="userName"
              id="userName"
            />
            {formik.touched.userName && formik.errors.userName ? (
              <div className={style.error}>{formik.errors.userName}</div>
            ) : null}
          </div>

          <div className={style["name-container"]}>
            <div className={style["input-box"]}>
              <input
                type="text"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="First Name"
                name="firstName"
                id="firstName"
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className={style.error}>{formik.errors.firstName}</div>
              ) : null}
            </div>
            <div className={style["input-box"]}>
              <input
                type="text"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Last Name"
                name="lastName"
                id="lastName"
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className={style.error}>{formik.errors.lastName}</div>
              ) : null}
            </div>
          </div>
          <div className={style["input-box"]}>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              name="email"
              id="email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={style.error}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className={style["input-box"]}>
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              name="password"
              id="password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={style.error}>{formik.errors.password}</div>
            ) : null}
          </div>
          <button type="submit" disabled={loader}>
            {!loader ? "register" : "wait!"}
          </button>
          <div className={style["register-link"]}>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
