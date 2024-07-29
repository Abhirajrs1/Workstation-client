import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Services/Interceptor/candidateInterceptor.js';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Footer from '../../Components/Footer';
import Navigation from '../../Components/Navigation.jsx';
import { FaBars } from 'react-icons/fa';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCategories, setShowCategories] = useState(false);
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
    );

    setFilteredJobs(filtered);
  };

  const handleCategoryChange = (category) => {
    const updatedSelectedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedSelectedCategories);

    const filtered = jobs.filter((job) =>
      updatedSelectedCategories.length === 0 || updatedSelectedCategories.includes(job.category)
    );

    setFilteredJobs(filtered.length ? filtered : jobs);
  };

  return (
    <div>
      <Navigation />
      <Container className="home-container mt-4">
        <div className="top-bar">
          <FaBars className="menu-icon" onClick={() => setShowCategories(!showCategories)} />
        </div>
        {showCategories && (
          <div className="categories-filter">
            {categories.map((category) => (
              <Form.Check
                key={category}
                type="checkbox"
                label={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        )}
        <Form onSubmit={handleSearch} className="search-form mb-4">
          <Row>
            <Col md={9}>
              <Form.Control
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Button variant="primary" type="submit" className="w-75">
                Find Jobs
              </Button>
            </Col>
          </Row>
        </Form>

        <h2 className="mb-4">Jobs based on your activity</h2>
        <div className="home-row">
          <div className="col-md-6">
            <div className="job-list">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
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
                ))
              ) : (
                <p>No jobs found. Please try a different search.</p>
              )}
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
                    <button className="btn btn-primary" onClick={() => applyJob(selectedJob._id)}>Apply now</button>
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
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
  