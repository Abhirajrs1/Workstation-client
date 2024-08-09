import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './JobApplication.css';
import Navigation from '../../../Components/Navigation';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import { AuthContext } from '../../../Context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import uploadFileToS3 from '../../../Utilis/s3.js';



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

  const handleFileChange = async(e) => {
    const file=e.target.files[0]
    if(file && file.type==='application/pdf'){
      try {
        // const resume=await uploadFileToS3(file)
        setFormData({ ...formData, resume: file});
      } catch (error) {
        alert('Only PDF files are allowed.');
        e.target.value = null;
      }
    }
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
          console.error('Error fetching job details:', error);
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
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }   
    
    try {
      // const applicationData={
      //   ...formData
      // }
      const response=await axiosInstance.post(`/employee-applyJob?jobid=${id}&recruiterid=${job.jobPostedBy}`,formDataToSubmit,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      console.log(response.data);
      if(response.data.success){
        navigate('/employee-jobApplicationSuccess')
      }else{
        navigate('/employee-jobApplicationFailure')
      }
    } catch (error) {
      navigate('/employee-jobApplicationFailure')
      console.log(error);
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
            <Form.Label>Upload Resume (PDF only) *</Form.Label>
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
