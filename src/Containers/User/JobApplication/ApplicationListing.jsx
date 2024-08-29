import React, { useState, useEffect } from 'react';
import Navigation from '../../../Components/Navigation';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import { useParams } from 'react-router-dom';

function ApplicationListing() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await axiosInstance.get('/employee-getApplications');
        if (response.data.success) {
          setApplications(response.data.applications);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApplication();
  }, []);

  const handleMessageClick = (employerId) => {
    window.location.href = `/message-employer/${employerId}`;
  };

  return (
    <>
      <Navigation />
      <Container className="employee-application-listing-container">
        {applications.length === 0 ? (
          <div className="employee-no-applications-message">No applications available</div>
        ) : (
          applications.map((application, index) => (
            <Card key={index} className="employee-application-item mt-4">
              <Card.Body>
                <Row>
                  <Col md={8} className="employee-application-details">
                    <h3 className="employee-job-title">{application.jobId.jobTitle}</h3>
                    <p className="employee-company-name">{application.jobId.companyName}</p>
                    <p className="employee-location">{application.jobId.jobLocation}</p>
                    <p className="employee-applied-on">Applied on: {application.appliedOn}</p>
                  </Col>
                  <Col md={4} className="employee-application-actions">
                    <Button
                      className="employee-message-employer"
                      onClick={() => handleMessageClick(application.employerId)}
                    >
                      Message employer <span className="employee-arrow-symbol">&rarr;</span>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}

export default ApplicationListing;