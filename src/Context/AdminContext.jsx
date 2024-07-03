import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminContext() {
    const [admin,setAdmin]=useState(null)
    const [loading,setLoading]=useState(true)

    axios.defaults.withCredentials=true

    useEffect(()=>{
     const checkAuthenticated=async()=>{
        
     }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AdminContext
