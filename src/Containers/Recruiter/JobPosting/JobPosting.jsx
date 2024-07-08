import React, { useState } from 'react';
import './JobPosting.css';
import axios from 'axios'
import ReNavigation from '../../../Components/ReNavigation';
import Swal from 'sweetalert2';
import SideNav from '../../../Components/SideNav';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';
function JobPosting() {
    const[formData,setFormData]=useState({
        jobTitle:'',
        companyName:'',
        minPrice:'',
        maxPrice:'',
        jobLocation:'',
        yearsOfExperience:'',
        employmentType:'',
        skills:[],
        description:''
    })

    const handleChange=(e)=>{
        const {id,value}=e.target
        if(id==='skills'){
            const selectedSkills=Array.from(e.target.selectedOptions,option=>option.value)
            setFormData({...formData,skills:selectedSkills})
        }else{
            setFormData({...formData,[id]:value})
        }
    }
    const handleSkillChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setFormData({ ...formData, skills: [...formData.skills, value] });
        } else {
            const updatedSkills = formData.skills.filter(skill => skill !== value);
            setFormData({ ...formData, skills: updatedSkills });
        }
    };
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response=await axiosInstance.post('/recruiter-postJob',formData)
            if (response.data.success) {
                console.log(response.data);
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: response.data.message,
                  position: 'top-center',
                });
                setFormData({
                  jobTitle: '',
                  companyName: '',
                  minPrice: '',
                  maxPrice: '',
                  jobLocation: '',
                  yearsOfExperience: '',
                  employmentType: '',
                  skills: [],
                  description: ''
                });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: response.data.message,
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
                    position: 'top-center',
                  });
              } else {
                console.error('An error occurred:', error);
                Swal.fire({
                    title: 'Error!',
                    text:"An error occured.Please try again later",
                    icon: 'error',
                    position: 'top-center',
                  });
            }
        }
    }
  return (
    <>
      <ReNavigation />
      <SideNav/>
      <div className="container job-posting-form">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="jobTitle" className="form-label">Job Title</label>
              <input type="text" className="form-control" id="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Web developer" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="companyName" className="form-label">Company Name</label>
              <input type="text" className="form-control" id="companyName" value={formData.companyName} onChange={handleChange} placeholder="Ex: Microsoft" required />
            </div>
            <div className="col-md-6">
              <label htmlFor="minPrice" className="form-label">Minimum Salary</label>
              <input type="number" className="form-control" value={formData.minPrice} onChange={handleChange} id="minPrice" placeholder="100000" required/>
            </div>
            <div className="col-md-6">
              <label htmlFor="maxPrice" className="form-label">Maximum Salary</label>
              <input type="number" className="form-control" value={formData.maxPrice} onChange={handleChange} id="maxPrice" placeholder="500000" required/>
            </div>
            <div className="col-md-6">
              <label htmlFor="jobLocation" className="form-label">Job Location</label>
              <input type="text" className="form-control" id="jobLocation" value={formData.jobLocation} onChange={handleChange} placeholder="Ex: New York" required/>
            </div>
            <div className="col-md-6">
                            <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
                            <input type="number" className="form-control" id="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} placeholder="5" required />
                        </div>
            <div className="col-md-6">
              <label htmlFor="employmentType" className="form-label">Employment Type</label>
              <select className="form-select" value={formData.employmentType} onChange={handleChange} id="employmentType" required>
                <option selected>Select job type</option>
                <option value="fulltime">Full-time</option>
                <option value="parttime">Part-time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div className="col-12">
                            <label className="form-label">Required Skill Sets</label>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="HTML" id="HTML" onChange={handleSkillChange} checked={formData.skills.includes('HTML')} />
                                <label className="form-check-label" htmlFor="HTML">
                                    HTML
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="CSS" id="CSS" onChange={handleSkillChange} checked={formData.skills.includes('CSS')} />
                                <label className="form-check-label" htmlFor="CSS">
                                    CSS
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="JavaScript" id="JavaScript" onChange={handleSkillChange} checked={formData.skills.includes('JavaScript')} />
                                <label className="form-check-label" htmlFor="JavaScript">
                                    JavaScript
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="React" id="React" onChange={handleSkillChange} checked={formData.skills.includes('React')} />
                                <label className="form-check-label" htmlFor="React">
                                    React
                                </label>
                            </div>
                        </div>
            <div className="col-12">
              <label htmlFor="description" className="form-label">Job Description</label>
              <textarea className="form-control" id="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Job description" required></textarea>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default JobPosting;
