import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import Navigation from '../../../Components/Navigation';
import ReactStars from 'react-rating-stars-component'; // Library for displaying stars
import { FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';

import './ViewReviews.css';

function ViewReviews() {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState('');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosInstance.get(`/employee-getCompanyDetails/${id}`);
                if (response.data.success) {
                    setCompany(response.data.company);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching company reviews:', error);
                setLoading(false);
            }
        };
        fetchReviews();
    }, [id]);

    const handleSubmitReview = async () => {
        try {
            const reviewData = {
                rating,
                comment: review,
                company: id,
            };
            const response = await axiosInstance.post('/employee-addReviewAndRating', { reviewData });
            if (response.data.success) {
                Swal.fire({
                    title: 'Review Submitted!',
                    text: 'Thank you for your review.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    setShowModal(false);
                    window.location.reload();
                });
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    return (
        <>
            <Navigation />
            <Container className="view-reviews-container">
                <div className="view-reviews-header">
                    <h2 className="view-reviews-title">{company?.companyName} - Reviews</h2>
                    <Button variant="primary" className="view-reviews-button" onClick={handleShowModal}>
                        Write Review
                    </Button>
                </div>
                {company && (!company.reviewsId || company.reviewsId.length === 0) ? (
                    <p>No reviews available for this company.</p>
                ) : (
                    <Row>
                        {company.reviewsId.map((review, index) => (
                            <Col md={12} key={index} className="mb-4">
                                <div className="review-item">
                                    <div className="review-header">
                                        <div className="review-rating">
                                            <span className="review-rating-value">
                                                {review.rating.toFixed(1)}
                                            </span>
                                            <ReactStars
                                                count={5}
                                                value={review.rating}
                                                size={24}
                                                edit={false}
                                                isHalf={true}
                                                activeColor="#ffd700"
                                            />
                                        </div>
                                        <h5 className="reviewer-name">{review.reviewerName}</h5>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                    <small className="review-date">{new Date(review.reviewDate).toLocaleDateString()}</small>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Write a Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Rate Your Experience</h5>
                        <div className="star-rating mb-4">
                            {[...Array(5)].map((_, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        key={index}
                                        className={`star-button ${index <= (hover || rating) ? 'on' : 'off'}`}
                                        onClick={() => setRating(index)}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        <FaStar className="star" />
                                    </button>
                                );
                            })}
                        </div>
                        <Form.Group>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Write your review..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmitReview}>
                            Submit Review
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default ViewReviews;
