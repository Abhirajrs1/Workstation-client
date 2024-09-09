import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import './Reviews.css'
import Navigation from '../../../Components/Navigation.jsx';
import ReactStars from 'react-rating-stars-component';


function Reviews() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const response = await axiosInstance.get('/employee-getCompanies'); 
          if(response.data.success){
            setCompanies(response.data.companies);
          }
        } catch (error) {
          console.error('Error fetching companies:', error);
        }
      };
      fetchCompanies();
    }, []);
  
    const calculateAverageRating = (reviews) => {
      if (reviews.length === 0) return 0;
      const total = reviews.reduce((acc, review) => acc + review.rating, 0);
      return (total / reviews.length).toFixed(1); 
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
          <div className="candidate-company-reviews-logo">
            <img src={company.logo} alt={company.companyName} className="img-fluid" />
          </div>
          <Card.Title className="candidate-company-reviews-title">
            {company.companyName}
          </Card.Title>
          <div className="candidate-company-reviews-rating">
            <ReactStars
              count={5}
              value={parseFloat(calculateAverageRating(company.reviewsId))}
              size={24}
              isHalf={true}
              edit={false}
              activeColor="#ffd700"
            />
          </div>
          <Card.Text className="candidate-company-reviews-description">
            {company.companyDescription}
          </Card.Text>
        </Card>
      </Col>
    ))}
  </Row>
</Container>

        </>
  )
}

export default Reviews
