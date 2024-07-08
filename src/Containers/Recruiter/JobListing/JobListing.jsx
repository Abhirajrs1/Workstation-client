import React, { useContext, useEffect, useState } from 'react';
import './JobListing.css';
import SideNav from '../../../Components/SideNav';
import ReNavigation from '../../../Components/ReNavigation';
import axios from 'axios';
import { RecruiterAuth } from '../../../Context/RecruiterContext';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const {recruiter}=useContext(RecruiterAuth)


    useEffect(() => {
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
    }, []);

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
                            <button className="view-job-button">VIEW JOB</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default JobListing;
