import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Card, Table, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';
import { FaArrowLeft } from 'react-icons/fa';
import './JobApplicationDetails.css';
import ReNavigation from '../../../Components/ReNavigation.jsx';

const JobApplicationDetails = () => {
    const { id } = useParams();
    const [application, setApplication] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
        const fetchApplicationDetails = async () => {
            try {
                const response = await axiosInstance.get(`/recruiter-getApplicationDetails/${id}`);
                console.log(response.data);
                setApplication(response.data.application);
            } catch (error) {
                console.error('Error fetching application details:', error);
            }
        };

        fetchApplicationDetails();
    }, [id]);

    const handleBackClick = () => {
        navigate('/recruiter-showApplications');
    };

    if (!application) {
        return <div>Loading...</div>;
    }

    return (
        <>
        {/* <ReNavigation/> */}
        <Container className="mt-5">
            <Card>
                <Card.Header className="card-header-custom">
                    <Button variant="link" className="back-button" onClick={handleBackClick}>
                        <FaArrowLeft />
                    </Button>
                    <span className="header-title">Application Details</span>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover responsive className="application-details-table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{application.name}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{application.email}</td>
                            </tr>
                            <tr>
                                <th>Contact</th>
                                <td>{application.contact}</td>
                            </tr>
                            <tr>
                                <th>Date of Birth</th>
                                <td>{new Date(application.dob).toLocaleDateString()}</td>
                            </tr>
                            <tr>
                                <th>Total Experience</th>
                                <td>{application.totalExperience} years</td>
                            </tr>
                            <tr>
                                <th>Current Company</th>
                                <td>{application.currentCompany}</td>
                            </tr>
                            <tr>
                                <th>Current Salary</th>
                                <td>{application.currentSalary}</td>
                            </tr>
                            <tr>
                                <th>Expected Salary</th>
                                <td>{application.expectedSalary}</td>
                            </tr>
                            <tr>
                                <th>Preferred Location</th>
                                <td>{application.preferredLocation}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{application.city}</td>
                            </tr>
                            <tr>
                                <th>Resume Link</th>
                                <td><a href={application.resume} target="_blank" rel="noopener noreferrer">View Resume</a></td>
                            </tr>
                            <tr>
                                <th>Job Id</th>
                                <td>{application.jobId}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
        </>
    );
};

export default JobApplicationDetails;
