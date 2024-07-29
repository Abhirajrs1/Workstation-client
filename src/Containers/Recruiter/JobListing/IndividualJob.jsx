import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';
import { RecruiterAuth } from '../../../Context/RecruiterContext.jsx';
import './IndividualJob.css';
import ReNavigation from '../../../Components/ReNavigation.jsx';
import { FaArrowLeft, FaBriefcase, FaMapMarkerAlt, FaDollarSign, FaClock, FaGraduationCap, FaTools, FaBuilding } from 'react-icons/fa';

function IndividualJob() {
    const [job, setJob] = useState(null);
    const { id } = useParams();
    const { Authenticated, loading } = useContext(RecruiterAuth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !Authenticated) {
            navigate('/recruiter-login');
        } else {
            const fetchDetails = async () => {
                try {
                    const response = await axiosInstance.get(`/recruiter-viewJob/${id}`);
                    if (response.data.success) {
                        setJob(response.data.job);
                    } else {
                        console.log("Failed to fetch job");
                    }
                } catch (error) {
                    console.log("Error fetching job:", error);
                }
            };
            fetchDetails();
        }
    }, [Authenticated, loading, navigate, id]);

    if (!job) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <ReNavigation />
            <div className="job-details-page">
                <Container>
                    <Button className="back-buttons" onClick={() => navigate('/recruiter-listJob')}>
                        <FaArrowLeft /> 
                    </Button>
                    <Card className="job-card">
                        <Card.Body>
                            <Row>
                                <Col md={8}>
                                    <h1 className="job-title">{job.jobTitle}</h1>
                                    <div className="company-info">
                                        <FaBuilding /> {job.companyName}
                                    </div>
                                    <div className="job-meta">
                                        <span><FaMapMarkerAlt /> {job.jobLocation}</span>
                                        <span><FaBriefcase /> {job.employmentType}</span>
                                        <span><FaDollarSign /> ${job.minPrice} - ${job.maxPrice}</span>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <Row className="mt-4">
                        <Col md={8}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <h2>Job Description</h2>
                                    <p>{job.description}</p>
                                </Card.Body>
                            </Card>
                            
                            <Card className="mb-4">
                                <Card.Body>
                                    <h2>Requirements</h2>
                                    <ul>
                                        <li><FaClock /> {job.yearsOfExperience} years of experience</li>
                                        <li><FaGraduationCap /> {job.education}</li>
                                    </ul>
                                </Card.Body>
                            </Card>

                            <Card>
                                <Card.Body>
                                    <h2>Skills</h2>
                                    <div>
                                        {job.skills.map((skill, index) => (
                                            <Badge bg="light" text="dark" key={index} className="me-2 mb-2">{skill}</Badge>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        
                        <Col md={4}>
                            <Card className="job-summary">
                                <Card.Body>
                                    <h2>Job Summary</h2>
                                    <ul className="summary-list">
                                        <li><FaBuilding /> Company: {job.companyName}</li>
                                        <li><FaMapMarkerAlt /> Location: {job.jobLocation}</li>
                                        <li><FaBriefcase /> Job Type: {job.employmentType}</li>
                                        <li><FaDollarSign /> Salary: ${job.minPrice} - ${job.maxPrice}</li>
                                        <li><FaClock /> Experience: {job.yearsOfExperience} years</li>
                                        <li><FaGraduationCap /> Education: {job.education}</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default IndividualJob;
