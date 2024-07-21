import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Services/Interceptor/adminInterceptor.js';
import AdminNavigation from '../../../Components/AdminNavigation.jsx';
import AdminSideNavigation from '../../../Components/AdminSideNavigation.jsx';
import './AdminJobListing.css';

function AdminJobListing() {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await axiosInstance.get(`/admin-jobdetails/${id}`);
                if (response.data.success) {
                    setJob(response.data.job);
                } else {
                    setError('Failed to load job details');
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                setError('An error occurred while fetching job details');
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
      <>
        <Container className="job-details-page">
            <Row>
                <Col>
                    <Card className="job-card">
                        <Card.Header as="h1">{job.jobTitle}</Card.Header>
                        <Card.Body>
                            <div className="job-header">
                                <Card.Title>{job.companyName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{job.jobLocation}</Card.Subtitle>
                            </div>
                            <div className="job-description">
                                <h3>Job Description</h3>
                                <Card.Text>{job.description}</Card.Text>
                            </div>
                            <div className="job-details">
                                <div className="detail-item">
                                    <h3>Skills</h3>
                                    <ul>
                                        {job.skills && job.skills.map((skill, index) => (
                                            <li key={index}>{skill}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="detail-item">
                                    <h3>Years of Experience</h3>
                                    <p>{job.yearsOfExperience} years</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Employment Type</h3>
                                    <p>{job.employmentType}</p>
                                </div>
                                <div className="detail-item">
                                    <h3>Salary Range</h3>
                                    <p>${job.minPrice} - ${job.maxPrice}</p>
                                </div>
                            </div>
                            <Button variant="primary" onClick={() => navigate('/admin-jobs')}>Back to Jobs</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default AdminJobListing;