import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './JobApplication.css';
function JobApplication() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        dateOfBirth: {
          day: '',
          month: '',
          year: '',
        },
        totalExperience: {
          year: '',
          month: '',
        },
        currentCompany: '',
        currentSalary: '',
        expectedSalary: '',
        noticePeriod: '',
        preferredLocation: '',
        city: '',
        pastUSTExperience: '',
        resume: null,
        legallyAuthorized: '',
        termsAccepted: false,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          dateOfBirth: { ...formData.dateOfBirth, [name]: value },
        });
      };
    
      const handleExperienceChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          totalExperience: { ...formData.totalExperience, [name]: value },
        });
      };
    
      const handleFileChange = (e) => {
        setFormData({ ...formData, resume: e.target.files[0] });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // Handle form submission here
      };
    
  return (
    <Container className="job-application-form">
      <h1>You are applying for Lead I - Software Engineering</h1>
      <p>
        <span className="icon">📅</span> 5 - 7 Years
        <span className="icon">👤</span> 1 Opening
        <span className="icon">📍</span> Trivandrum
      </p>

      <Form onSubmit={handleSubmit}>
        <h2>Personal Details</h2>
        <Row>
          <Col md={4}>
            <Form.Group controlId="firstName">
              <Form.Label>First name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="middleName">
              <Form.Label>Middle name</Form.Label>
              <Form.Control
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="lastName">
              <Form.Label>Last name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email ID *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contactNumber">
              <Form.Label>Contact number *</Form.Label>
              <Form.Control
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="dobDay">
              <Form.Label>Date of birth *</Form.Label>
              <Form.Control
                as="select"
                name="day"
                value={formData.dateOfBirth.day}
                onChange={handleDateChange}
                required
              >
                <option value="">Day</option>
                {/* Add day options */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dobMonth">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={formData.dateOfBirth.month}
                onChange={handleDateChange}
                required
              >
                <option value="">Month</option>
                {/* Add month options */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="dobYear">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as="select"
                name="year"
                value={formData.dateOfBirth.year}
                onChange={handleDateChange}
                required
              >
                <option value="">Year</option>
                {/* Add year options */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <h2>Professional Details</h2>
        <Row>
          <Col md={6}>
            <Form.Group controlId="totalExperienceYear">
              <Form.Label>Total experience *</Form.Label>
              <Form.Control
                as="select"
                name="year"
                value={formData.totalExperience.year}
                onChange={handleExperienceChange}
                required
              >
                <option value="">Select Year</option>
                {/* Add year options */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="totalExperienceMonth">
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={formData.totalExperience.month}
                onChange={handleExperienceChange}
                required
              >
                <option value="">Select Month</option>
                {/* Add month options */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="currentCompany">
          <Form.Label>Current Company *</Form.Label>
          <Form.Control
            type="text"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="currentSalary">
              <Form.Label>Current/ Last drawn salary *</Form.Label>
              <Form.Control
                type="text"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="expectedSalary">
              <Form.Label>Expected annual salary *</Form.Label>
              <Form.Control
                type="text"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="noticePeriod">
              <Form.Label>Notice period *</Form.Label>
              <Form.Control
                as="select"
                name="noticePeriod"
                value={formData.noticePeriod}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                {/* Add notice period options */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="preferredLocation">
              <Form.Label>Preferred Location *</Form.Label>
              <Form.Control
                as="select"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {/* Add location options */}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="city">
          <Form.Label>City *</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="pastUSTExperience">
          <Form.Label>
            Indicate past employment experience with UST *
          </Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              label="Yes"
              name="pastUSTExperience"
              value="Yes"
              checked={formData.pastUSTExperience === 'Yes'}
              onChange={handleChange}
              required
            />
            <Form.Check
              inline
              type="radio"
              label="No"
              name="pastUSTExperience"
              value="No"
              checked={formData.pastUSTExperience === 'No'}
              onChange={handleChange}
              required
            />
          </div>
        </Form.Group>

        <Form.Group controlId="resume">
          <Form.Label>Upload resume *</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept=".doc,.docx,.pdf,.rtf"
            required
          />
          <Form.Text className="text-muted">
            Maximum file size 3 MB, File format: .doc, .docx, .pdf, .rtf
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="legallyAuthorized">
          <Form.Label>
            Are you legally authorized to work in the country you are applying for? *
          </Form.Label>
          <Form.Control
            as="select"
            name="legallyAuthorized"
            value={formData.legallyAuthorized}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="termsAccepted">
          <Form.Check
            type="checkbox"
            label="I have read and accept the terms of use and privacy policy."
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={(e) =>
              setFormData({ ...formData, termsAccepted: e.target.checked })
            }
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Application
        </Button>
      </Form>
    </Container>
  )
}

export default JobApplication
