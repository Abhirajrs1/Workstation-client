import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation.jsx';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  axios.defaults.withCredentials = true;
  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employee-listJobs');
        if (response.data.success) {
          setJobs(response.data.jobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  const applyJob=(id)=>{
    navigate(`/employee-jobApplication/${id}`)
  }

  return (
    <div>
      <Navigation />
      <div className="container mt-4">
        <h2 className="mb-4">Jobs based on your activity</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="job-list">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className={`job-card ${selectedJob?._id === job._id ? 'active' : ''}`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="job-card-header">
                    <h5 className="job-title">{job.jobTitle}</h5>
                    <span className="company-name">{job.companyName}</span>
                  </div>
                  <p className="job-location">{job.jobLocation}</p>
                  <div className="easy-apply">
                    <span className="easy-apply-tag">🚀 Easily apply</span>
                  </div>
                  <p className="job-posted">Posted on {job.jobPostedOn}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="job-details-container">
              {selectedJob ? (
                <div className="job-details">
                  <h2 className="job-title">{selectedJob.jobTitle}</h2>
                  <span className="company-name">↗ {selectedJob.companyName}</span>
                  <div className="job-info">
                    <div className="job-field">
                      <h4>Location</h4>
                      <p>{selectedJob.jobLocation}</p>
                    </div>
                    <div className="job-field">
                      <h4>Salary</h4>
                      <p>₹{selectedJob.minPrice} - ₹{selectedJob.maxPrice} a month</p>
                    </div>
                    <div className="job-field">
                      <h4>Education (Preferred)</h4>
                      <p>{selectedJob.education}</p>
                    </div>
                    <div className="job-field">
                      <h4>Experience</h4>
                      <p>{selectedJob.yearsOfExperience} years</p>
                    </div>
                    <div className="job-field">
                      <h4>Employment Type</h4>
                      <p>{selectedJob.employmentType}</p>
                    </div>
                    <div className="job-field">
                      <h4>Posted On</h4>
                      <p>{selectedJob.jobPostedOn}</p>
                    </div>
                    <div className="job-field">
                      <h4>Description</h4>
                      <p>{selectedJob.description}</p>
                    </div>
                    <div className="job-field">
                      <h4>Skills</h4>
                      <ul>
                        {selectedJob.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <button className="btn btn-primary" onClick={()=>(applyJob(selectedJob._id))}>Apply now</button>
                  </div>
                </div>
              ) : (
                <div className="job-details">
                  <p>Select a job to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
