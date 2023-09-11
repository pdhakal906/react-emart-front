import React from 'react'
import { Navigate, Outlet } from 'react-router'

import { useSelector } from 'react-redux';

const AuthRoutes = () => {
  const { userInfo } = useSelector((store) => store.userInfo);
  // return userInfo === null ? <Login /> : <Outlet />

  // return userInfo === null ? <Outlet /> : <Navigate to='/' replace />
  return userInfo === null ? <Outlet /> : <Navigate to='/' replace />

}

export default AuthRoutes
