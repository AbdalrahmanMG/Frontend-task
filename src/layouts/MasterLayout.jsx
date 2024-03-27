import React, { useContext, useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom'
import { authContext } from './../context/AuthContext';

export default function MasterLayout() {
  const { setToken } = useContext(authContext)

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      let token = localStorage.getItem("token")
      setToken(token)
    }
  }, [])
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
