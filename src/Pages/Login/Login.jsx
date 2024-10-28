import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../../context/User";

export default function Login() {
  const { setRole2,setRole } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleForm = async (values) => {
    setLoader(true);
    try {
      const response = await axios.post(
        "https://ecommercent.runasp.net/api/User/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoader(false);
      console.log(response.data);
      toast.success("Login successfully", {
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
      const token = response.data.token;
      console.log("token is : " + token);
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken.role);
      setRole2(decodedToken.role)
      setRole(decodedToken.role)
      localStorage.setItem("token",token)
      localStorage.setItem('role',decodedToken.role)
      // localStorage.setItem('role',decodedToken.role)

      if(decodedToken.role==="User")
      navigate('/')
    else if (decodedToken.role==="Admin")
    navigate('/products')

    } catch (error) {
      setLoader(false);
      console.error("Login error:", error);
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
      } else {
        toast.error("Login failed");
      }
    } finally {
      setLoader(false);
    }
  };

  let formik = useFormik({
    initialValues: {
      password: "",
      email: "",
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

          <button type="submit" className="mt-4" disabled={loader}>
            {!loader ? "Login" : "wait!"}
          </button>

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
