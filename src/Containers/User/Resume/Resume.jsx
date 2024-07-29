import React, { useContext,useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import Navigation from '../../../Components/Navigation';
import './Resume.css';

function Resume() {
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
    return (
        <>
        <Navigation/>
    <Container className="resume mt-4">
      <Row className="resume-header align-items-center">
        <Col xs="auto" onClick={()=>navigate('/employee-profile')}>
          <button className="back-button">←</button>
        </Col>
        <Col>
          <h2 className="fw-bold">{user.username}</h2>
        </Col>
        <Col xs="auto">
          <div className="avatar">AR</div>
        </Col>
      </Row>
      <Row className="resume-info">
        <Col>
          <div className="info-box">
            <div className="info-item">
              <FaEnvelope className="icon" />
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <FaPhone className="icon" />
              <span>{user.contact}</span>
              <Link to="/employee-editResume" className="edit-link">
                <FaChevronRight className="edit-icon" />
              </Link>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="icon" />
              <span>{userAddress.city || 'N/A'}, {userAddress.state || 'N/A'}</span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default Resume;
