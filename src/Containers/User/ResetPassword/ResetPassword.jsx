import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import logo from '../../../Assets/logo3.png'
import './ResetPassword.css'
import { validateResetPassword } from '../../../Utilis/helper.js';

function ResetPassword() {

    const[password,setPassword]=useState('')
    const [errors,setErrors]=useState({})
  
    const navigate=useNavigate()
    const {token}=useParams()

    axios.defaults.withCredentials=true

    const handleSubmit=async(e)=>{
       e.preventDefault()
       const errors = validateResetPassword(password.trim());
       setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }

       try {
         const response=await axios.post(`http://localhost:3000/employee-resetPassword/${token}`,{password:password.trim()})
         if(response.data.success){
            console.log(response.data);
            Swal.fire({
              title: 'Success!',
              text: response.data.message,
              icon: 'success',
              timer: 5000,
              position: 'top-center',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/employee-login');
              }
            });
     }else{
      Swal.fire({
        title: 'Error!',
        text: response.data.message,
        icon: 'error',
        timer: 5000,
        position: 'top-center',
    });
    setPassword('')
}
} catch (error) {
if (error.response && error.response.data && error.response.data.message) {
    Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        timer: 5000,
        position: 'top-center',
    });
} else {
    Swal.fire({
        title: 'Error!',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        timer: 5000,
        position: 'top-center',
    });
}
}
setIsSubmitting(false);
}
  return (
<div className='reset-container d-flex justify-content-center align-items-center vh-100 bg-dark'>
            <div className="card reset-password-card">
                <img
                    src={logo}
                    alt="profile"
                    className="logo"
                />
                <h3 className="text-center mb-4">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Please enter your new password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}              
                            id="password"
                            placeholder="New Password"
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <div className="invalid-feedback mb-2">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Reset
                    </button>
                </form>
            </div>
        </div>
  )
}

export default ResetPassword

