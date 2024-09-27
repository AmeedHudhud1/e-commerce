import React from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate()


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  });

  const handleForm = async (values) => {
    try {
      const response = await axios.post(
        'https://ecommercent.runasp.net/api/User/login', 
        {
          email: values.email,
          password: values.password
        },
        {
          headers: {
            'Content-Type': 'application/json'  // This sets the request to send JSON data
          }
        }
      );
      console.log(response.data);
  
      toast.success('Login successfully', {
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
    } catch (error) {
      console.error('Registration error:', error);
      
      if (error.response && error.response.data) {
       
          toast.error(`${error.response.data}`, {
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
        ;
      } else {
        // Generic error message
        toast.error('Registration failed');
      }
    }
  };

  let formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm(values)
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
              <div className={style["forgot"]}>
            <a href="">Forgot Password</a>
          </div>
          </div>

          

          <button type="submit" className="mt-4">Login</button>

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
