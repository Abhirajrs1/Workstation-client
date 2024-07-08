import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import axiosInstance from '../Services/Interceptor/recruiterInterceptor.js';


export const RecruiterAuth=createContext()

function RecruiterContext({children}) {

    const[recruiter,setRecruiter]=useState(JSON.parse(localStorage.getItem('recruiter')) || null)
    const[loading,setLoading]=useState(true)

    axios.defaults.withCredentials=true

    useEffect(()=>{
        const checkAuthenticated=async()=>{
            const token=localStorage.getItem('recruitertoken')
            if(token){
                try {
                    const response=await axiosInstance.get('/recruiter-verify')
                    if(response.data.success){
                        setRecruiter(JSON.parse(localStorage.getItem('recruiter')))
                    }else{
                        setUser(null)
                        localStorage.removeItem('recruiter');
                    }
                } catch (error) {
                    console.error('An error occurred during token verification:', error);
                    setRecruiter(null);
                    localStorage.removeItem('recruiter');
                }
            }
            setLoading(false)
        }
        checkAuthenticated()
    },[])

    const RecruiterLogin=async(email,password)=>{
        try {
            const response = await axiosInstance.post('/recruiter-login', { email, password});
        if(response.data.success){
            console.log(response.data.recruiter);
            setRecruiter(response.data.recruiter)
            localStorage.setItem('recruitertoken',response.data.token)
            localStorage.setItem('recruiter', JSON.stringify(response.data.recruiter));
            return true
        }else {
            console.log(response.data.message);
            Swal.fire({
                title: 'Error!',
                text: response.data.message,
                icon: 'error',
                timer: 5000,
                position: 'top-center',
              });    
          }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                console.error(error.response.data);
                Swal.fire({
                    title: 'Error!',
                    text: error.response.data.message,
                    icon: 'error',
                    timer: 5000,
                    position: 'top-center',
                  });
              } else {
                console.error('An error occurred:', error);
                Swal.fire({
                    title: 'Error!',
                    text:"An error occured.Please try again later",
                    icon: 'error',
                    timer: 5000,
                    position: 'top-center',
                  });
            }
        }
    }
    const RecruiterLogout=async()=>{
        try {
            const response=await axiosInstance.get('/recruiter-logout')
                if(response.data.success){
                    setRecruiter(null)
                    localStorage.removeItem('recruitertoken')
                    localStorage.removeItem('recruiter')
                        Swal.fire({
                        title: 'Success!',
                        text: response.data.message,
                        icon: 'success',
                        timer: 5000,
                        position: 'top-center',
                      })
                }
        } catch (error) {
            console.log("An error occured during logout",error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                    icon: 'error',
                    timer: 5000,
                    position: 'top-center',
                  });
        }
    }
  return (
    <div>
      <RecruiterAuth.Provider value={{recruiter,setRecruiter,loading,Authenticated:!!recruiter,RecruiterLogin,RecruiterLogout}}>
          {children}
      </RecruiterAuth.Provider>
    </div>
  )
}

export default RecruiterContext
