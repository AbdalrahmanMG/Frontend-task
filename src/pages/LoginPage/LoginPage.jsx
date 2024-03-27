import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/AuthContext'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { setToken } = useContext(authContext)
  let navigate = useNavigate()

  let validationSchema = yup.object({
    email: yup.string()
      .email('Invalid Email')
      .required("This field Required")
      .matches(/^([a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com))$/, 'Invalid Email'),

    password: yup.string()
      .required("This field Required")
      .min(8, "Password must be 8 characters or more")
      .max(20, "Password must be less than 20 characters")
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8-20 characters long')
  })

  async function onSubmit(values) {
    setIsLoading(true)
    try {
      let res = await axios.post('https://first-posts-backend.onrender.com/api/v1/users/login', values)
      if (res.status == 200) {
        let token = res.data.token
        setToken(token)
        localStorage.setItem('token', token)
        navigate('/dashboard')
      }
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    }, validationSchema,
    onSubmit
  })


  return (<>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="userEmail">Email: </label>
      <input type="email"
        id='userEmail'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
        name='email'
        className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
      {formik.errors.email && formik.touched.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="userPassword">Password: </label>
      <input type="password"
        id='userPassword'
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.password}
        name='password'
        className='block w-3/6 my-2 p-2 border border-gray-300 rounded-md m-auto focus:ring-red-500 focus:border-orange-300' />
      {formik.errors.password && formik.touched.password ? <div>{formik.errors.password}</div> : null}

      <button type='submit' className='m-auto my-4 btn btn-success' disabled={!(formik.isValid && formik.dirty) || isLoading}>
        {isLoading ? <span className="loading loading-spinner"></span> : <></>}ٍ
        Login</button>
    </form>
  </>
  )
}
