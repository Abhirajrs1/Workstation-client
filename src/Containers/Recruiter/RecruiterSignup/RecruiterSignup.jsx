import React, { useState } from 'react';
import axios from 'axios';
import logo from '../../../Assets/logo2.png';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validateRecruiterSignupForm } from '../../../Utilis/helper.js';
import './RecruiterSignup.css';

function SignUp() {
    const [recruitername,setRecruitername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState("")
    const [errors,setErrors]=useState({})

    const navigate=useNavigate()

    
    axios.defaults.withCredentials=true
 
    const handleSubmit=async(e)=>{
     e.preventDefault()

    const errors = validateRecruiterSignupForm(recruitername.trim(), email.trim(), password.trim(),confirmPassword.trim());
    setErrors(errors)

    if (Object.keys(errors).length > 0) {
      return;
    }

     try {
     const response=await axios.post('http://localhost:3000/recruiter-signup',{recruitername:recruitername.trim(),email:email.trim(),password:password.trim()})
     if(response.data.success){
        localStorage.setItem("recruiteremail",email)
        console.log(response.data);
        Swal.fire({
            title: 'Success!',
            text: response.data.message,
            icon: 'success',
            timer: 5000, 
            position: 'top-center', 
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/recruiter-verifyOtp');
            }
          });
     }else{
        console.log(response.data);
        Swal.fire({
            title: 'Error!',
            text: response.data.message,
            icon: 'error',
            timer: 5000,
            position: 'top-center',
          });}
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
            console.error("An error occurred:", error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred. Please try again later.',
                icon: 'error',
                timer: 5000,
                position: 'top-center',
              });
            }
     }  
    }
     return (
        <div className="recruitersignup-container d-flex align-items-center justify-content-center ">
      <div className="d-flex">
        <div className="banner p-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" width="300" className="mb-3" />
        </div>
        <div className="form p-4 bg-white d-flex flex-column align-items-center justify-content-center">
            <div className='link'>
            <Link to="/employee-signup" id="forgot" className="text-muted ">
            Are you an employee?
            </Link>
            </div>
        
          <h2 className="mb-3">Recruiter Signup</h2>
          <img
            src="https://i.pinimg.com/236x/4d/a8/bb/4da8bb993057c69a85b9b6f2775c9df2.jpg"
            alt="profile"
            width="70"
            className="mb-3 rounded-circle shadow"
          />
          <form onSubmit={handleSubmit} className="w-100">
            <small className="mb-3 d-flex justify-content-center align-items-center">
              Do you have an Account? <Link to="/recruiter-login">Login</Link>
            </small>
            <input
              type="text"
              className={`form-control ${errors.recruitername ? 'is-invalid' : ''}`} 
              placeholder="Recruiter name"
              autoComplete="off"
              value={recruitername}
              onChange={(e) => setRecruitername(e.target.value.replace(/[^a-zA-Z]/g, ''))}
            />
            {errors.recruitername && <div className="invalid-feedback mb-2">{errors.recruitername}</div>}
            <input
              type="text"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email"
              pattern='.*'
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback mb-2">{errors.email}</div>}
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}              
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback mb-2">{errors.password}</div>}
             <input
              type="password"
              className={`form-control  ${errors.confirmPassword ? 'is-invalid' : ''}`} 
              placeholder="Confirm password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="invalid-feedback mb-2">{errors.confirmPassword}</div>}
            <button type="submit" className="btn btn-primary mb-4 w-100">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
     )
 }

export default SignUp

                  