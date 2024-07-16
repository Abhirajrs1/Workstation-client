import React, { useEffect,useContext } from 'react'
import AdminSideNavigation from '../../../Components/AdminSideNavigation'
import AdminNavigation from '../../../Components/AdminNavigation'
import { AdminAuth } from '../../../Context/AdminContext'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
  const {Authenticated,loading}=useContext(AdminAuth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!Authenticated && !loading){
      navigate('/admin-login')
    }
  },[Authenticated,navigate,loading])
  return (
    <div>
        <AdminSideNavigation/>
        <AdminNavigation/>

    </div>


  )
}

export default AdminHome
