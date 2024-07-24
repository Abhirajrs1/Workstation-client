import React, { useContext, useEffect, useState } from 'react';
import './JobListing.css';
import SideNav from '../../../Components/SideNav';
import ReNavigation from '../../../Components/ReNavigation';
import { RecruiterAuth } from '../../../Context/RecruiterContext';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const {recruiter,Authenticated,loading}=useContext(RecruiterAuth)
    const navigate=useNavigate()


    useEffect(() => {
        if(!loading && !Authenticated ||!recruiter){
            navigate('/recruiter-login')
        }else{
            const fetchJobs = async () => {
                try {
                    const response = await axiosInstance.get(`/recruiter-showJobs/${recruiter._id}`);
                    if (response.data.success) {
                        console.log(response.data.jobs);
                        setJobs(response.data.jobs);
                    } else {
                        console.log("Failed to fetch data");
                    }
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                }
            };
            fetchJobs();
        }
    }, [loading,Authenticated,navigate,recruiter,recruiter._id]);

    const viewJob=(id)=>{
        navigate(`/recruiter-viewJob/${id}`)
    }

   
    const deleteJob = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosInstance.delete(`/recruiter-deleteJob/${id}`);
                console.log(response);
                if (response.data.success) {
                    setJobs(jobs.filter(job => job._id !== id));
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    );
                }
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    return (
        <>
            <ReNavigation />
            <SideNav />
            <div className="job-listing">
                {jobs.map(job => (
                    <div key={job._id} className="job-card">
                        <div className="card-body">
                            <div className="header">
                                <div>
                                    <h3 className="job-title">{job.jobTitle}</h3>
                                    <h6 className="company-name">{job.companyName}</h6>
                                </div>
                                <div className="action-icons">
                                    <FaEdit className="edit-icon"  />
                                    <FaTrashAlt className="delete-icon" onClick={()=>deleteJob(job._id)} />
                                </div>
                            </div>
                            <div className="job-details">
                                <span className="detail-item">📍 {job.jobLocation}</span>
                                <span className="detail-item">🕒 {job.employmentType}</span>
                                <span className="detail-item">💰 ${job.minPrice}-${job.maxPrice}</span>
                                <span className="detail-item">📅 {job.jobPostedOn}</span>
                            </div>

                            <p className="job-description">
                                {job.description}
                            </p>
                            <button className="view-job-button" onClick={()=>viewJob(job._id)}>VIEW JOB</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default JobListing;
