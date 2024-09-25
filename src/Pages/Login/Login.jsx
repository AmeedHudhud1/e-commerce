import React from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate()


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  });

  const handleForm = () => {
    
    toast.success('login succesfuly', {
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

      navigate('/')

  };

  let formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm()
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Login</h1>
          <div className={style["input-box"]}>
            <input
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="email"
              name="email"
              id=""
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
              placeholder="password"
              name="password"
              id=""
            />
            {formik.touched.password && formik.errors.password ? (
                <div className={style.error}>{formik.errors.password}</div>
              ) : null}
          </div>

          <div className={style["forgot"]}>
            <a href="">Forgor Password</a>
          </div>

          <button type="submit">Login</button>

          <div className={style["register-link"]}>
            <p>
              Don't have an account? <Link to="/register">register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
