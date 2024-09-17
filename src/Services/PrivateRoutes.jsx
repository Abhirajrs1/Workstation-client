import React from 'react'
import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes() {
  const Cookie = Cookies.get("accessToken");
  return Cookie ? <Outlet/> : <Navigate to='/employee-login'/>
}
export default PrivateRoutes

export function RecruiterPrivateRoutes() {
    const Cookie = Cookies.get("recruiteraccessToken");
    return Cookie ? <Outlet/> : <Navigate to='/recruiter-login'/>
  }
  
  export function AdminPrivateRoutes() {
    const Cookie = Cookies.get("adminaccessToken");
    return Cookie ? <Outlet/> : <Navigate to='/admin-login'/>
  }

  export function CompanyPrivateRoutes() {
    const Cookie = Cookies.get("companyaccessToken");
    return Cookie ? <Outlet/> : <Navigate to='/company-login'/>
  }
