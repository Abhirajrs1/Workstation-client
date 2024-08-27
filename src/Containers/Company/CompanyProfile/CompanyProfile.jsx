import React, { useContext, useEffect, useState } from 'react';
import { CompanyAuth } from '../../../Context/CompanyContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFileAlt, FaChevronRight, FaUpload, FaBirthdayCake, FaBuilding, FaInfoCircle } from 'react-icons/fa';
import Navigation from '../../../Components/Navigation';
import axiosInstance from '../../../Services/Interceptor/companyInterceptor.js';
import './CompanyProfile.css';
import CompanyNavigation from '../../../Components/CompanyNavigation.jsx';

function CompanyProfile() {
    const { company, loading, Authenticated } = useContext(CompanyAuth);
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [remainingWords, setRemainingWords] = useState(1000);
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeUrl, setResumeUrl] = useState(company?.resumeUrl || '');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        if (!Authenticated && !loading || company?.block) {
            navigate("/company-login");
        }
    }, [Authenticated, loading, navigate, company?.block]);

    useEffect(() => {
        if (company.description) {
            setDescription(company?.description);
        }
    }, [company?.description]);    

    useEffect(() => {
        setRemainingWords(1000 - description.split(/\s+/).filter(Boolean).length);
    }, [description]);

    const handleDescriptionChange = (e) => {
        const words = e.target.value.split(/\s+/).filter(Boolean);
        if (words.length <= 1000) {
            setDescription(e.target.value);
        }
    };

    useEffect(() => {
        if (company._id) {
            const fetchDescription = async () => {
                try {
                    const response = await axiosInstance.get(`/company-getDescription/${company._id}`);
                    if (response.data.success) {
                        setDescription(response.data.result);
                    }
                } catch (error) {
                    console.error('Error fetching description:', error);
                }
            };

            fetchDescription();
        }
    }, [company._id]);

    useEffect(() => {
        const fetchResumeUrl = async () => {
            if (company._id) {
                try {
                    const response = await axiosInstance.get('/company-getResumeUrl');
                    if (response.data.success) {
                        setResumeUrl(response.data.resumeUrl);  
                    }
                } catch (error) {
                    console.error('Error fetching resume URL:', error);
                }
            }
        };

        fetchResumeUrl();
    }, [company._id]);

    const handleDescriptionSubmit = async () => {
        try {
            const response = await axiosInstance.put('/company-addDescription', {
                companyId: company._id,
                description
            });
            if (response.data.success) {
                setDescription(response.data.description.description);
            }
        } catch (error) {
            console.error('Error updating description:', error);
            alert('Failed to update description');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);
        } else {
            alert('Please select a PDF file.');
        }
    };

    const handleUpload = async () => {
        if (resumeFile) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('resume', resumeFile);

            try {
                const response = await axiosInstance.post('/company-addResume', formData);
                if (response.data.success) {
                    setResumeUrl(response.data.resumeUrl);  
                    setResumeFile(null);
                }
            } catch (error) {
                console.error('Error uploading resume:', error);
                alert('Failed to upload resume');
            } finally {
                setIsUploading(false);
            }
        }
    };

    if (loading) {
        return <div>....Loading</div>;
    }
    if (!Authenticated) {
        navigate("/company-login");
        return null;
    }

    const companyAddress = company.companyaddress && company.companyaddress.length > 0 ? company.companyaddress[0] : {};
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const year = String(date.getFullYear()).slice(-2); 
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <CompanyNavigation/>
            <Container className="company-profile-container mt-2 d-flex justify-content-center">
                <Card className="p-4 shadow-sm" style={{ width: '100%', maxWidth: '600px' }}>
                    <i
                        className="fas fa-arrow-left fa-lg mb-3"
                        style={{ cursor: 'pointer' }}
                        onClick={() => navigate('/company-home')}
                    ></i>
                    <Row className="align-items-center mb-4">
                        <Col xs={10}>
                            <h1 className="fw-bold">{company.companyName}</h1>
                        </Col>
                        <Col xs={2} className="text-end">
                            <div className="company-profile-initials-circle bg-dark text-white d-flex align-items-center justify-content-center">
                                {company.companyName[0]}
                            </div>
                        </Col>
                    </Row>
                    <div className='company-profile-details p-2'>
                        <div className="company-profile-detail-row">
                            <div className="company-profile-detail-icon-text">
                                <FaEnvelope />
                                <p>{company.email || "N/A"}</p>
                            </div>
                        </div>
                        <div className="company-profile-detail-row">
                            <div className="company-profile-detail-icon-text">
                                <FaPhone />
                                <p>{company.contactNumber || "N/A"}</p>
                            </div>
                            <Link to="/company-profile/editForm">
                                <FaChevronRight />
                            </Link>
                        </div>
                        <div className="company-profile-detail-row">
                            <div className="company-profile-detail-icon-text">
                                <FaBuilding />
                                <p>{company.industry || "N/A"}</p>
                            </div>
                        </div>
                        <div className="company-profile-detail-row">
                            <div className="company-profile-detail-icon-text">
                                <FaMapMarkerAlt />
                                <p>{companyAddress.city || 'N/A'}, {companyAddress.state || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <h5 className="company-profile-heading fw-bold">Improve your business</h5>
                    <Row className="align-items-center mt-3 mb-3">
                        <Col xs={10}>
                            <p className="mb-0">About Us</p>
                        </Col>
                        <Col xs={2} className="text-end">
                            <Link to="/company-profile/about">
                                <FaChevronRight />
                            </Link>
                        </Col>
                    </Row>
                    <Form.Group className="mt-3">
                        <Form.Label className="company-profile-heading">Company Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Add your company description here..."
                        />
                        <Form.Text className="text-muted">
                            {remainingWords} words remaining
                        </Form.Text>
                        <Button 
                            variant="primary" 
                            className="mt-2" 
                            onClick={handleDescriptionSubmit}
                        >
                            Save Description
                        </Button>
                    </Form.Group>
                </Card>
            </Container>
        </div>
    );
}

export default CompanyProfile;
