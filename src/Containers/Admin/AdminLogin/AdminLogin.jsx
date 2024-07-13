import React, { useContext, useState } from 'react';
import axios from 'axios';
import logo from '../../../Assets/logo2.png'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { validateLoginForm } from '../../../Utilis/helper.js';

function AdminLogin() {
  return (
    <div className="recruiterlogin-container d-flex align-items-center justify-content-center ">
      <div className="d-flex">
        <div className="banner p-4 d-flex flex-column align-items-center justify-content-center">
          <img src={logo} alt="Logo" width="300" className="mb-3" />
        </div>
        <div className="form p-4 bg-white d-flex flex-column align-items-center justify-content-center">
            <div className='link'>
            <Link to="/employee-login" id="forgot" className="text-muted ">
            Are you a candidate?
            </Link>
            </div>
        
          <h2 className="mb-3">Recruiter Login</h2>
          <img
            src="https://i.pinimg.com/236x/4d/a8/bb/4da8bb993057c69a85b9b6f2775c9df2.jpg"
            alt="profile"
            width="70"
            className="mb-3 rounded-circle shadow"
          />
          <form onSubmit={handleSubmit} className="w-100">
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
              placeholder="Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {errors.password && <div className="invalid-feedback ">{errors.password}</div>}
            <button type="submit" className="btn btn-primary mb-3 w-100">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
