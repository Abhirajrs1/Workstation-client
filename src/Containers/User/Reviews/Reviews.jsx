import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import './Reviews.css'
import Navigation from '../../../Components/Navigation.jsx';


function Reviews() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const response = await axiosInstance.get('/api/companies'); 
          setCompanies(response.data);
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
      fetchCompanies();
    }, []);
  
    // Calculate the average rating for a company
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) return 0;
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (total / reviews.length).toFixed(1); // Return average rating to 1 decimal point
    };
  
  return (
    <>
    <Navigation/>
<Container className="candidate-company-reviews-container">
      <Row className="justify-content-center">
        <Col md={8} className="text-center">
          <h1 className="candidate-company-reviews-heading">Find great places to work</h1>
          <p>Get access to millions of company reviews</p>
        </Col>
      </Row>

      <Row className="candidate-company-reviews-list">
        {companies.map((company) => (
          <Col md={4} key={company._id} className="mb-4">
            <Card className="candidate-company-reviews-card">
              <Card.Body>
                <div className="candidate-company-reviews-logo">
                  <img src={company.logo} alt={company.companyName} className="img-fluid" />
                </div>
                <Card.Title>{company.companyName}</Card.Title>
                <Card.Text>
                  Overall Rating: 
                  <span className="candidate-company-reviews-rating">
                    {calculateAverageRating(company.reviewsId)} / 5
                  </span>
                </Card.Text>
                <Card.Text>{company.companyDescription}</Card.Text>
                <div className="candidate-company-reviews-links">
                  <Button variant="link">Salaries</Button>
                  <Button variant="link">Questions</Button>
                  <Button variant="link">Open Jobs</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
        </>
  )
}

export default Reviews
