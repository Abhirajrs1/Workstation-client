import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './JobApplication.css';
import Navigation from '../../../Components/Navigation';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import { AuthContext } from '../../../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import claudinary from '../../../Utilis/claudinary.js';

function JobApplication() {

  const {isAuthenticated,loading,user}=useContext(AuthContext)
  const {id}=useParams()

  const navigate=useNavigate()
  const [job,setJob]=useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    dob: '',
    totalExperience: '',
    currentCompany: '',
    currentSalary: '',
    expectedSalary: '',
    preferredLocation: '',
    city: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0].type !== 'application/pdf') {
      alert('Only PDF files are allowed');
      e.target.value = null;
      return;
    }
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  useEffect(()=>{
    if(!isAuthenticated && !loading || !user){
      navigate('/employee-login')
    }else{
      const fetchJobDetails=async()=>{
        try {
          const response=await axiosInstance.get(`/employee-getIndividualJobDetails/${id}`)
          if(response.data.success){
            console.log(response.data.job);
            setJob(response.data.job)
          }
        } catch (error) {
          
        }

      }
      fetchJobDetails()
    }

  },[isAuthenticated,loading,user,id])

  if (!job) {
    return <div className="loading">Loading...</div>;
}

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const resumeUrl=await claudinary(formData.resume,'pdf_preset','raw')
      const applicationData={
        ...formData,
        resume:resumeUrl
      }
      const response=await axiosInstance.post(`/employee-applyJob?jobid=${id}&recruiterid=${job.jobPostedBy}`,applicationData)
      if(response.data.success){
        

      }
    } catch (error) {
      
    }
  };

  return (
    <>
    <Navigation/>
    <Container className="job-application-form">
      <h1>You are applying for {job.jobTitle}</h1>
      <p>
        <span>🏢 {job.yearsOfExperience} Years</span>
        <span className="icon">{job.jobLocation}</span>
      </p>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email ID *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="contact">
              <Form.Label>Contact number *</Form.Label>
              <Form.Control
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth *</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="totalExperience">
              <Form.Label>Total Experience (in years) *</Form.Label>
              <Form.Control
                type="number"
                name="totalExperience"
                value={formData.totalExperience}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="currentCompany">
              <Form.Label>Current Company *</Form.Label>
              <Form.Control
                type="text"
                name="currentCompany"
                value={formData.currentCompany}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="currentSalary">
              <Form.Label>Current Annual Salary *</Form.Label>
              <Form.Control
                type="number"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="expectedSalary">
              <Form.Label>Expected Annual Salary</Form.Label>
              <Form.Control
                type="number"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="preferredLocation">
          <Form.Label>Preferred Location *</Form.Label>
          <Form.Control
            type="text"
            name="preferredLocation"
            value={formData.preferredLocation}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City *</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="resume">
          <Form.Label>Upload Resume *</Form.Label>
          <Form.Control
            type="file"
            name="resume"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
    </>
  );
}

export default JobApplication;
