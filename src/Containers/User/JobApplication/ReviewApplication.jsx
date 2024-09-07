import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import { Container, Card, Button, Form } from 'react-bootstrap';
import './ReviewApplication.css';
import { AuthContext } from '../../../Context/UserContext';
import Navigation from '../../../Components/Navigation.jsx';

function ReviewApplication() {
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [workExperiences, setWorkExperiences] = useState([]);
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentCompany, setCurrentCompany] = useState('')
  const [currentSalary, setCurrentSalary] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  useEffect(() => {
    if (!isAuthenticated && !loading || !user) {
      navigate('/employee-login');
    } else {
      const fetchJobDetails = async () => {
        try {
          const response = await axiosInstance.get(`/employee-getIndividualJobDetails/${id}`);

          if (response.data.success) {
            setJobDetails(response.data.job);
          }
        } catch (error) {
          console.error('Error fetching job details:', error);
        }
      };
      const fetchWorkExperience = async () => {
        try {
          const response = await axiosInstance.get('/employee-getWorkExperience');
          if (response.data.success) {
            setWorkExperiences(response.data.experiences);
          }
        } catch (error) {
          console.error('Error fetching work experiences:', error);
        }
      };

      fetchJobDetails();
      fetchWorkExperience();
    }
  }, [isAuthenticated, loading, user, id, navigate]);

  if (!jobDetails) {
    return <div className="loading">Loading...</div>;
  }

  const handleApply = async () => {
    try {
      const applicationData = {
        name: user.username,
        email: user.email,
        contact: user.contact,
        dob: user.dob,
        totalExperience: yearsOfExperience,
        currentCompany: currentCompany,
        currentSalary: currentSalary,
        expectedSalary: expectedSalary,
        preferredLocation: preferredLocation,
        resume: user.resume
      }
      const response = await axiosInstance.post(`/employee-applyJob?jobid=${id}&recruiterid=${jobDetails.jobPostedBy}`, applicationData)
      if (response.data.success) {
        navigate(`/employee-jobApplicationSuccess/${jobDetails.company}`)
      } else {
        navigate('/employee-jobApplicationFailure')
      }
    } catch (error) {
      navigate('/employee-jobApplicationFailure')
    }
  };

  const handleViewResume = () => {
    if (user.resume) {
      window.open(user.resume, '_blank');
    }
  };

  return (
    <>
      <Navigation />
      <Container className="review-application-container">
        <Card className="review-application-card">
          <Card.Body>
            <div className="review-application-header">
              <Button variant="link" className="back-button" onClick={() => navigate('/')}>
                Exit
              </Button>
            </div>
            <div className="job-details-container">
              <Card className="job-details-card">
                <Card.Body>
                  <h5 className="job-title">{jobDetails?.jobTitle}</h5>
                  <p className="company-name">{jobDetails?.companyName}</p>
                </Card.Body>
              </Card>
            </div>
            <hr className="divider" />
            <div className="user-details">
              <h4 className="review-application-heading">Please review user application</h4>
              <div className="user-details-container">
                <div className="user-detail">
                  <h5 className="detail-label">Candidate Name:</h5>
                  <p className="detail-value">{user.username}</p>
                </div>
                <div className="user-detail">
                  <h5 className="detail-label">Date of Birth:</h5>
                  <p className="detail-value">{user.dob}</p>
                </div>
                <div className="user-detail">
                  <h5 className="detail-label">Email address:</h5>
                  <p className="detail-value">{user.email}</p>
                </div>
                <div className="user-detail">
                  <h5 className="detail-label">Phone:</h5>
                  <p className="detail-value">{user.contact}</p>
                </div>
                <div className="user-detail">
                  <h5 className="detail-label">Education:</h5>
                  <ul className="detail-list">
                    {user.Qualification.education &&
                      user.Qualification.education.map((edu, index) => (
                        <li key={index}>
                          {edu.degree} in {edu.specialization} - {edu.collegeName}, {edu.city}, {edu.state}, {edu.country}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="user-detail">
                  <h5 className="detail-label">Skills:</h5>
                  <ul className="detail-list">
                    {user.Qualification.skills &&
                      user.Qualification.skills.map((skill, index) => (
                        <li key={index}>{typeof skill === 'object' ? JSON.stringify(skill) : skill}</li>
                      ))}
                  </ul>
                </div>

                <div className="user-detail">
                  <h5 className="detail-label">Experience:</h5>
                  <ul className="detail-list">
                    {workExperiences.length > 0 ? (
                      workExperiences.map((experience, index) => (
                        <li key={index}>
                          {experience.jobTitle} at {experience.companyName} ({experience.startDate} - {experience.endDate})
                        </li>
                      ))
                    ) : (
                      <li>No experience available</li>
                    )}
                  </ul>

                </div>
                <div className="user-detail">
                  <h5 className="detail-label">Resume:</h5>
                  {user.resume ? (
                    <Button variant="link" onClick={handleViewResume}>View Resume</Button>
                  ) : (
                    <p className="detail-value">No resume available</p>
                  )}

                </div>
              </div>
              <div className="additional-details">
                <Form.Group className="mb-3">
                  <Form.Label>Current Company:</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentCompany}
                    onChange={(e) => setCurrentCompany(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Current Salary:</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentSalary}
                    onChange={(e) => setCurrentSalary(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Expected Salary:</Form.Label>
                  <Form.Control
                    type="number"
                    value={expectedSalary}
                    onChange={(e) => setExpectedSalary(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Years of Experience:</Form.Label>
                  <Form.Control
                    type="number"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Preferred Location:</Form.Label>
                  <Form.Control
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="review-application-footer">
              <Button variant="primary" onClick={handleApply}>
                Submit
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default ReviewApplication;