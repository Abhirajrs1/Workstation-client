import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
export const adminAuth=createContext()

function AdminContext() {
  const[admin,setAdmin]=useState(JSON.parse(localStorage.getItem('admin')) || null)
  const [loading,setLoading]=useState(true)

    axios.defaults.withCredentials=true

    useEffect(()=>{
     const checkAuthenticated=async()=>{
      const token=localStorage.getItem('admintoken')
      if(token){
        try {
          const response=await axios.get('http://localhost:3000/admin-verify',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        if(response.data.success){
            setRecruiter(JSON.parse(localStorage.getItem('recruiter')))
        }else{
            setUser(null)
            localStorage.removeItem('recruiter');
        }
          
        } catch (error) {
          
        }

      }
        
     }
    },[])
  return (
    <div>
      
    </div>
  )
}

export default AdminContext
