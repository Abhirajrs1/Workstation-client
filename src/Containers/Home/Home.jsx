import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Services/Interceptor/candidateInterceptor.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation.jsx';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Importing React Icon for back arrow

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/employee-listJobs');
        if (response.data.success) {
          setJobs(response.data.jobs);
          setFilteredJobs(response.data.jobs);
        }

        const categoryResponse = await axiosInstance.get('/employee-getCategories');
        if (categoryResponse.data.success) {
          setCategories(categoryResponse.data.categories.map(cat => cat.categoryName));
        }
      } catch (error) {
        console.error('Error fetching jobs or categories:', error);
      }
    };

    fetchData();
  }, []);

  const applyJob = (id) => {
    navigate(`/employee-jobApplication/${id}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = jobs.filter((job) =>
      (job.jobTitle.toLowerCase().includes(lowerSearchTerm) || job.companyName.toLowerCase().includes(lowerSearchTerm))
      && (selectedCategory ? job.categoryName === selectedCategory : true)
    );
    setFilteredJobs(filtered);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job); 
  };

  const handleBackClick = () => {
    window.location.reload()
    };

  return (
    <div>
      <Navigation />
      <Container className="home-container mt-4">
        <FaArrowLeft className="home-back-arrow" onClick={handleBackClick} /> 
        <Form onSubmit={handleSearch} className="home-search-form mb-4">
          <Row className="home-search-row">
            <Col md={5} className="home-search-col">
              <Form.Control
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="home-search-input"
              />
            </Col>
            <Col md={4} className="home-category-col">
              <Form.Control
                as="select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="home-category-dropdown"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Col>
            <Col md={3} className="home-find-jobs-col">
              <Button variant="primary" type="submit" className="home-find-jobs-button">
                Find
              </Button>
            </Col>
          </Row>
        </Form>

        <h2 className="home-jobs-heading mb-4">Jobs based on your activity</h2>
        <div className="home-row">
          <div className="home-col-md-6">
            <div className="home-job-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className={`home-job-card ${selectedJob && selectedJob._id === job._id ? 'home-job-card-active' : ''}`}
                    onClick={() => handleJobClick(job)} 
                  >
                    <div className="home-job-card-header">
                      <h5 className="home-job-title">{job.jobTitle}</h5>
                      <span className="home-company-name">{job.companyName}</span>
                    </div>
                    <p className="home-job-location">{job.jobLocation}</p>
                    <div className="home-easy-apply">
                      <span className="home-easy-apply-tag">🚀 Easily apply</span>
                    </div>
                    <p className="home-job-posted">Posted on {job.jobPostedOn}</p>
                  </div>
                ))
              ) : (
                <p>No jobs found. Please try a different search.</p>
              )}
            </div>
          </div>
          <div className="home-col-md-6">
            <div className="home-job-details-container">
              {selectedJob ? (
                <div className="home-job-details">
                  <h2 className="home-job-title-highlight">{selectedJob.jobTitle}</h2>
                  <span className="home-company-name-highlight">{selectedJob.companyName}</span>
                  <div className="home-action-buttons">
                    <button className="btn btn-primary" onClick={() => applyJob(selectedJob._id)}>Apply now</button>
                  </div>
                  <div className="home-job-info">
                    <div className="home-job-field">
                      <h4>Location</h4>
                      <p>{selectedJob.jobLocation}</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Salary</h4>
                      <p>₹{selectedJob.minPrice} - ₹{selectedJob.maxPrice} a month</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Education (Preferred)</h4>
                      <p>{selectedJob.education}</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Experience</h4>
                      <p>{selectedJob.yearsOfExperience} years</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Employment Type</h4>
                      <p>{selectedJob.employmentType}</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Posted On</h4>
                      <p>{selectedJob.jobPostedOn}</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Description</h4>
                      <p>{selectedJob.description}</p>
                    </div>
                    <div className="home-job-field">
                      <h4>Skills</h4>
                      <ul>
                        {selectedJob.skills.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="home-job-details">
                  <p>Select a job to see details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
