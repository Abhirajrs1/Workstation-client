import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation.jsx';
import './Home.css';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  axios.defaults.withCredentials = true;

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
                    <button className="btn-more">⋮</button>
                  </div>
                  <p className="company-name">{job.companyName}</p>
                  <p className="job-location">{job.jobLocation}</p>
                  {job.minPrice && job.maxPrice && (
                    <p className="job-salary">₹{job.minPrice} - ₹{job.maxPrice} a month</p>
                  )}
                  <div className="easy-apply">
                    <span className="easy-apply-tag">🚀 Easily apply</span>
                  </div>
                  <ul className="job-highlights">
                    <p>{job.description}</p>
                  </ul>
                  <p className="job-posted">Active 3 days ago</p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6">
            <div className="job-details-container">
              {selectedJob ? (
                <div className="job-details">
                  <h4 className="job-title">{selectedJob.jobTitle}</h4>
                  <p className="company-name">{selectedJob.companyName} <span className="external-link">↗</span></p>
                  <p className="job-location">{selectedJob.jobLocation}</p>
                  {selectedJob.minPrice && selectedJob.maxPrice && (
                    <p className="job-salary">₹{selectedJob.minPrice} - ₹{selectedJob.maxPrice} a month</p>
                  )}
                  <div className="action-buttons">
                    <button className="btn btn-primary">Apply now</button>
                    <button className="btn btn-outline-secondary icon-button"><i className="far fa-bookmark"></i></button>
                    <button className="btn btn-outline-secondary icon-button"><i className="far fa-times-circle"></i></button>
                  </div>
                  <div className="job-details-section">
                    <h5>Job details</h5>
                    <p>Here's how the job details align with your profile <span className="external-link">↗</span></p>
                    <div className="detail-item">
                      <h6><i className="fas fa-money-bill-wave"></i> Pay</h6>
                      <p>₹{selectedJob.minPrice} - ₹{selectedJob.maxPrice} a month</p>
                    </div>
                    <div className="detail-item">
                      <h6><i className="fas fa-briefcase"></i> Job type</h6>
                      <div>
                        <span className="tag tag-primary">{selectedJob.employmentType}</span>
                      </div>
                    </div>
                   
                  </div>
                  <div className="qualifications-section">
                    <h6>Qualifications:</h6>
                    <p><strong>Education:</strong> Bachelor's (Preferred)</p>
                    <p><strong>Experience:</strong> total work: {selectedJob.yearsOfExperience} years (Preferred)</p>
                    <p><strong>Work Location:</strong> In person</p>
                  </div>
                  <div className="profile-insights">
                    <h5>Profile insights</h5>
                    <p>Here's how the job qualifications align with your profile <span className="external-link">↗</span></p>
                    <h6>Skills</h6>
                    <div className="skills-section">
                      {selectedJob.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    <p>Do you have experience in {selectedJob.skills.join(', ')}?</p>
                    <div className="experience-buttons">
                      <button className="btn btn-outline-primary">Yes</button>
                      <button className="btn btn-outline-primary">No</button>
                      <button className="btn btn-outline-primary">Skip</button>
                    </div>
                    <h6>Education</h6>
                    <p className="education-level">Bachelor's degree</p>
                    <p>Do you have a Bachelor's degree?</p>
                    <div className="experience-buttons">
                      <button className="btn btn-outline-primary">Yes</button>
                      <button className="btn btn-outline-primary">No</button>
                      <button className="btn btn-outline-primary">Skip</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="job-details">
                  <p>Select a job to see the details</p>
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
