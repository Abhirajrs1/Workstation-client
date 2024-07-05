import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/UserContext'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaChevronRight } from 'react-icons/fa';
import Navigation from '../../../Components/Navigation';
import axios from 'axios';

import './Profile.css'

function Profile() {
    const {user,loading,isAuthenticated}=useContext(AuthContext)
    const navigate=useNavigate()

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
  return (
    <div>
        <Navigation/>
    <Container className="mt-2 d-flex justify-content-center">
    <Card className="p-4 shadow-sm" style={{ width: '100%', maxWidth: '600px' }}>
      <Row className="align-items-center mb-4">
        <Col xs={10}>
          <h1 className="fw-bold">{user.username}</h1>
        </Col>
        <Col xs={2} className="text-end">
          <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
            AR
          </div>
        </Col>
      </Row>
      <div className='bg-light p-2'>
      <Row className="align-items-center mb-3">
        <Col xs={10}>
          <p className="mb-0">
            <FaEnvelope className="me-2" />
            {user.email}
          </p>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={10}>
          <p className="mb-0">
            <FaPhone className="me-2" />
            {user.contact||"N/A"}
          </p>
        </Col>
        <Col xs={2} className="text-end">
          <Link to="/employee-profile/editcontact">
            <FaChevronRight />
          </Link>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={10}>
          <p className="mb-0">
            <FaMapMarkerAlt className="me-2" />
            {userAddress.city||'N/A'},{userAddress.state||'N/A'}
          </p>
        </Col>
      </Row>
      </div>
      <h5 className="fw-bold mt-4">Resume</h5>
      <Row className="align-items-center mb-3">
        <Col xs={10}>
          <Card className="p-2">
            <Row>
              <Col xs={2} className="d-flex align-items-center justify-content-center">
                <FaFileAlt style={{ fontSize: '2rem' }} />
              </Col>
              <Col xs={10}>
                <p className="mb-0 fw-bold">Resume</p>
                <small>Updated Jun 10, 2024 - Searchable</small>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={2} className="text-end">
          <Link to="/edit-profile">
            <FaChevronRight style={{ cursor: 'pointer' }} />
          </Link>
        </Col>
      </Row>
      <h5 className="fw-bold mt-4">Improve your job matches</h5>
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
      {/* <Row className="align-items-center mb-3">
        <Col xs={10}>
          <p className="mb-0">Job preferences</p>
        </Col>
        <Col xs={2} className="text-end">
          <Link to="/edit-profile">
            <FaChevronRight />
          </Link>
        </Col>
      </Row> */}
    </Card>
  </Container>
  </div>

  )
}

export default Profile
