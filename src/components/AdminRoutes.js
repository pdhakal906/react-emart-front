import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router';

const AdminRoutes = () => {
  const { userInfo } = useSelector((store) => store.userInfo);
  return userInfo.isAdmin === true ? <Outlet /> : <Navigate to="/" />
}

export default AdminRoutes
