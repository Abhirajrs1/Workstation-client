import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ApplicationSuccess.css';
import Swal from 'sweetalert2';
import Navigation from '../../../Components/Navigation';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';

function ApplicationSuccess() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');

    const handleGoHome = () => {
        navigate('/');
    };

    const handleSubmitReview = async() => {
        try {
          const reviewData={
            rating,
            comment:review,
            company:id
          }
          const response=await axiosInstance.post('/employee-addReviewAndRating',{reviewData})
          if(response.data.success){
            Swal.fire({
                title: 'Review Submitted!',
                text: 'Thank you for your review.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                handleGoHome(); 
            });          }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <>
            <Navigation />
            <Container className="d-flex align-items-center justify-content-center">
                <Card className="text-center application-success-card mt-3">
                    <Card.Body>
                        <div className="success-icon">✓</div>
                        <Card.Title className="mb-3">Application Submitted!</Card.Title>
                        <Card.Text className="mb-4">
                            Thank you for applying. We'll review your application and get back to you soon.
                        </Card.Text>
                        <div className="rating-section mb-4">
                            <h5>Rate Your Experience</h5>
                            <div className="star-rating">
                                {[...Array(5)].map((_, index) => {
                                    index += 1;
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || rating) ? "star-button on" : "star-button off"}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                            <FaStar className="star" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <Form.Group className="mb-4">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Write your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSubmitReview} className="submit-review-button">
                            Submit 
                        </Button>
                        <Button variant="success" onClick={handleGoHome} className="go-home-button ms-2">
                            Go Home
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default ApplicationSuccess;
