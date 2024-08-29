import React, { useState, useContext, useEffect } from 'react';
import { CompanyAuth } from '../../../Context/CompanyContext.jsx';
import { Container, Card, Button, Form, Row, Col } from 'react-bootstrap';
import { FaFileAlt, FaUpload, FaTrash, FaCheck } from 'react-icons/fa';
import './CompanyDocuments.css';
import CompanyNavigation from '../../../Components/CompanyNavigation.jsx';
import axios from 'axios';

function CompanyDocuments() {
    const { company,setCompany } = useContext(CompanyAuth);
    const [documents, setDocuments] = useState({
        registrationCertificate: '',
        license: '',
        taxCertificate: ''
    });

    useEffect(() => {
        setDocuments({
            registrationCertificate: company.registrationCertificate || '',
            license: company.license || '',
            taxCertificate: company.taxCertificate || ''
        });
    }, [company]);

    const uploadRegistrationCertificate = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('docType', 'registrationCertificate');

                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const fileUrl = response.data.fileUrl;
                setDocuments((prevState) => ({ ...prevState, registrationCertificate: fileUrl }));
                setCompany({ ...company, registrationCertificate: fileUrl });
            } catch (error) {
                console.error('File upload error:', error);
            }
        }
    };

    const uploadLicense = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('docType', 'license');

                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const fileUrl = response.data.fileUrl;
                setDocuments((prevState) => ({ ...prevState, license: fileUrl }));
                setCompany({ ...company, license: fileUrl });
            } catch (error) {
                console.error('File upload error:', error);
            }
        }
    };

    const uploadTaxCertificate = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('docType', 'taxCertificate');

                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const fileUrl = response.data.fileUrl;
                setDocuments((prevState) => ({ ...prevState, taxCertificate: fileUrl }));
                setCompany({ ...company, taxCertificate: fileUrl });
            } catch (error) {
                console.error('File upload error:', error);
            }
        }
    };

    const handleDeleteRegistrationCertificate = () => {
        setDocuments((prevState) => ({ ...prevState, registrationCertificate: '' }));
        setCompany({ ...company, registrationCertificate: '' });
    };

    const handleDeleteLicense = () => {
        setDocuments((prevState) => ({ ...prevState, license: '' }));
        setCompany({ ...company, license: '' });
    };

    const handleDeleteTaxCertificate = () => {
        setDocuments((prevState) => ({ ...prevState, taxCertificate: '' }));
        setCompany({ ...company, taxCertificate: '' });
    };

    return (
        <>
            <CompanyNavigation />
            <Container className="company-documents-container">
                <h2 className="text-center mb-4">Company Documents</h2>
                <Row>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="document-card">
                            <Card.Body>
                                <div className="document-header">
                                    <Card.Title>Registration Certificate</Card.Title>
                                    {documents.registrationCertificate && <FaCheck className="text-success" />}
                                </div>
                                {documents.registrationCertificate ? (
                                    <div className="document-actions">
                                        <a href={documents.registrationCertificate} target="_blank" rel="noopener noreferrer" className="view-document">
                                            <FaFileAlt /> View Document
                                        </a>
                                        <Button variant="outline-danger" size="sm" onClick={handleDeleteRegistrationCertificate}>
                                            <FaTrash /> Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="upload-section">
                                        <Form.Control
                                            type="file"
                                            id="registrationCertificateFile"
                                            onChange={uploadRegistrationCertificate}
                                            accept=".pdf,.doc,.docx"
                                            hidden
                                        />
                                        <label htmlFor="registrationCertificateFile" className="upload-button">
                                            <FaUpload /> Upload Registration Certificate
                                        </label>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="document-card">
                            <Card.Body>
                                <div className="document-header">
                                    <Card.Title>License</Card.Title>
                                    {documents.license && <FaCheck className="text-success" />}
                                </div>
                                {documents.license ? (
                                    <div className="document-actions">
                                        <a href={documents.license} target="_blank" rel="noopener noreferrer" className="view-document">
                                            <FaFileAlt /> View Document
                                        </a>
                                        <Button variant="outline-danger" size="sm" onClick={handleDeleteLicense}>
                                            <FaTrash /> Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="upload-section">
                                        <Form.Control
                                            type="file"
                                            id="licenseFile"
                                            onChange={uploadLicense}
                                            accept=".pdf,.doc,.docx"
                                            hidden
                                        />
                                        <label htmlFor="licenseFile" className="upload-button">
                                            <FaUpload /> Upload License
                                        </label>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="document-card">
                            <Card.Body>
                                <div className="document-header">
                                    <Card.Title>Tax Certificate</Card.Title>
                                    {documents.taxCertificate && <FaCheck className="text-success" />}
                                </div>
                                {documents.taxCertificate ? (
                                    <div className="document-actions">
                                        <a href={documents.taxCertificate} target="_blank" rel="noopener noreferrer" className="view-document">
                                            <FaFileAlt /> View Document
                                        </a>
                                        <Button variant="outline-danger" size="sm" onClick={handleDeleteTaxCertificate}>
                                            <FaTrash /> Remove
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="upload-section">
                                        <Form.Control
                                            type="file"
                                            id="taxCertificateFile"
                                            onChange={uploadTaxCertificate}
                                            accept=".pdf,.doc,.docx"
                                            hidden
                                        />
                                        <label htmlFor="taxCertificateFile" className="upload-button">
                                            <FaUpload /> Upload Tax Certificate
                                        </label>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CompanyDocuments;
