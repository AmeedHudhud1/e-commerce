import React from 'react';
import style from './Register.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Bounce, toast } from "react-toastify";

export default function Register() {
  const validationSchema = Yup.object({
    firstName: Yup.string().min(5, 'Must be at least 5 characters').max(10, 'Must be 10 characters or less').required('First Name is required'),
    lastName: Yup.string().min(5, 'Must be at least 5 characters').max(10, 'Must be 10 characters or less').required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  });

  const handleForm = () => {
    
    toast.success('register succesfuly', {
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


  };

  let formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleForm();
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <div className={style.main}>
      <div className={style.wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <h1>Register</h1>
          <div className={style['name-container']}>
            <div className={style['input-box']}>
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
            <div className={style['input-box']}>
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
          <div className={style['input-box']}>
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
          <div className={style['input-box']}>
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
          <button type="submit">Register</button>
          <div className={style['register-link']}>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
