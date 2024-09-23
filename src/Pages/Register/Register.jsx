  import React from 'react';
  import style from './Register.module.css';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

  export default function Register() {

    let formik = useFormik({
      initialValues: {
        firstName:"",
        lastName:"",
        email:"",
        password:""
      }, onSubmit:(values)=>{
        console.log(values);
      }
    })

    return (
      <div className={style.main}>
        <div className={style.wrapper}>
          <form onSubmit={formik.handleSubmit}>
            <h1>Register</h1>
            <div className={style['name-container']}>
              <div className={style['input-box']}>
                <input type="text" value={formik.values.firstName} onChange={formik.handleChange} placeholder='First Name' name="firstName" id="firstName" />
              </div>
              <div className={style['input-box']}>
                <input type="text" value={formik.values.lastName} onChange={formik.handleChange} placeholder='Last Name' name="lastName" id="lastName" />
              </div>
            </div>
            <div className={style['input-box']}>
              <input type="email" value={formik.values.email} onChange={formik.handleChange} placeholder='Email' name="email" id="email" />
            </div>
            <div className={style['input-box']}>
              <input type="password" value={formik.values.password} onChange={formik.handleChange} placeholder='Password' name="password" id="password" />
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
