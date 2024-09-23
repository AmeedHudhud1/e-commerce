import React from 'react'
import style from './Login.module.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
export default function Login() {

    let formik = useFormik({
        initialValues:{
            password:"",
            email:""
        }, onSubmit: (values) => {
            console.log('Form values:', values);
          },
    })


  return (
    <div className={style.main}>
        <div className={style.wrapper}>
            <form onSubmit={formik.handleSubmit}>
                <h1>Login</h1>
                <div className={style['input-box']}>
                    <input type="email" value={formik.values.email} onChange={formik.handleChange} placeholder="email" name="email" id="" />
                </div>
                
                <div className={style['input-box']}>
                    <input type="password" value={formik.values.password} onChange={formik.handleChange} placeholder="password" name="password" id="" />
                </div>


                <div className={style['forgot']}>
                    <a href="">Forgor Password</a>
                </div>

                <button type="submit">Login</button>

                <div className={style['register-link']}>
                <p>Don't have an account? <Link to="/register">register</Link></p>

                </div>
            </form>
        </div>
    </div>
  )
}
