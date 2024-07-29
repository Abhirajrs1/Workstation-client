import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaChevronRight } from 'react-icons/fa';
import Navigation from '../../../Components/Navigation';

import './Profile.css';

function Profile() {
    const { user, loading, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/employee-login");
        }
    }, [isAuthenticated, navigate]);

    if (loading) {
        return <div>....Loading</div>;
    }
    if (!isAuthenticated) {
        navigate("/employee-login");
        return null;
    }

    const userAddress = user.useraddress && user.useraddress.length > 0 ? user.useraddress[0] : {};
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(-2); 
        return `${day}/${month}/${year}`;
    };
    return (
        <div>
            <Navigation />
            <Container className="profile-container mt-2 d-flex justify-content-center">
                <Card className="p-4 shadow-sm" style={{ width: '100%', maxWidth: '600px' }}>
                <i
              className="fas fa-arrow-left fa-lg mb-3"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
              ></i>
                    <Row className="align-items-center mb-4">
                        <Col xs={10}>
                            <h1 className="fw-bold">{user.username}</h1>
                        </Col>
                        <Col xs={2} className="text-end">
                            <div className="profile-initials-circle bg-dark text-white d-flex align-items-center justify-content-center">
                                AR
                            </div>
                        </Col>
                    </Row>
                    <div className='profile-details p-2'>
                        <div className="profile-detail-row">
                            <div className="profile-detail-icon-text">
                                <FaEnvelope />
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <div className="profile-detail-row">
                            <div className="profile-detail-icon-text">
                                <FaPhone />
                                <p>{user.contact || "N/A"}</p>
                            </div>
                            <Link to="/employee-profile/editcontact">
                                <FaChevronRight />
                            </Link>
                        </div>
                        <div className="profile-detail-row">
                            <div className="profile-detail-icon-text">
                                <FaMapMarkerAlt />
                                <p>{userAddress.city || 'N/A'}, {userAddress.state || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <h5 className="profile-heading fw-bold">Resume</h5>
                    <Row className="align-items-center mb-3">
                        <Col xs={10}>
                            <Card className="p-2">
                                <Row>
                                    <Col xs={2} className="d-flex align-items-center justify-content-center">
                                        <FaFileAlt style={{ fontSize: '2rem' }} />
                                    </Col>
                                    <Col xs={10}>
                                        <p className="mb-0 fw-bold">Resume</p>
                                        <small>Updated on {formatDate(user.updatedAt)}</small>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                        <Col xs={2} className="text-end">
                            <Link to="/employee-resume">
                                <FaChevronRight style={{ cursor: 'pointer' }} />
                            </Link>
                        </Col>
                    </Row>
                    <h5 className="profile-heading fw-bold">Improve your job matches</h5>
                    <Row className="align-items-center mb-3">
                        <Col xs={10}>
                            <p className="mb-0">Qualifications</p>
                        </Col>
                        <Col xs={2} className="text-end">
                            <Link to="/employee-profile/qualifications">
                                <FaChevronRight />
                            </Link>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </div>
    );
}

export default Profile;
