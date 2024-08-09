import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaQuestionCircle, FaBell, FaEnvelope, FaCaretDown, FaLaptopCode, FaHome } from 'react-icons/fa';
import logo from '../Assets/logo2.png';
import { CompanyAuth } from '../Context/CompanyContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyNavigation.css';

function CompanyNavigation() {
    const { company, Authenticated, CompanyLogout } = useContext(CompanyAuth);
    const navigate = useNavigate();

    const handleLogout = () => {
        CompanyLogout();
        navigate('/company-login');
    };

    if (!Authenticated) {
        navigate('/company-login');
        return null;
    }

    return (
        <Navbar className="companynav-navbar navbar-expand-lg navbar-light bg-white border-bottom">
            <Container fluid>
                <Navbar.Brand as={Link} to="/company-home">
                    <img src={logo} alt="Workstation" style={{ height: '70px', width: '150px' }} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-nav" />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/company-home" className="companynav-text-dark me-3">
                            <FaHome className="me-1" />
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/company-help" className="companynav-text-dark me-3">
                            <FaQuestionCircle className="me-1" />
                            Help
                        </Nav.Link>
                        <Nav.Link as={Link} to="/company-notifications" className="companynav-text-dark me-3">
                            <FaBell />
                            <span className="ms-1">Notifications</span>
                        </Nav.Link>
                        <Nav.Link as={Link} to="/company-messages" className="companynav-text-dark me-3">
                            <FaEnvelope />
                            <span className="ms-1">Messages</span>
                        </Nav.Link>
                        <NavDropdown
                            title={<span className="companynav-text-dark">{company?.email}<FaCaretDown className="ms-1" /></span>}
                            id="companyUserDropdown"
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/company-profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default CompanyNavigation;
