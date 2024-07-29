import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EducationModal.css';

const EducationModal = ({ show, handleClose, addEducation }) => {
    const [education, setEducation] = useState({
        levelOfEducation: '',
        degree: '',
        specialization: '',
        city: '',
        state: '',
        country: '',
        collegeName: '',
        startDate: '',
        endDate: '',
        courseType: '',
        percentage: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducation(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addEducation(education);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Education</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formLevelOfEducation">
                        <Form.Label>Level of Education</Form.Label>
                        <Form.Control type="text" name="levelOfEducation" value={education.levelOfEducation} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formDegree">
                        <Form.Label>Degree</Form.Label>
                        <Form.Control type="text" name="degree" value={education.degree} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formSpecialization">
                        <Form.Label>Specialization</Form.Label>
                        <Form.Control type="text" name="specialization" value={education.specialization} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" value={education.city} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name="state" value={education.state} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCountry">
                        <Form.Label>Country</Form.Label>
                        <Form.Control type="text" name="country" value={education.country} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCollegeName">
                        <Form.Label>College Name</Form.Label>
                        <Form.Control type="text" name="collegeName" value={education.collegeName} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formStartDate">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control type="date" name="startDate" value={education.startDate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formEndDate">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control type="date" name="endDate" value={education.endDate} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formCourseType">
                        <Form.Label>Course Type</Form.Label>
                        <Form.Control type="text" name="courseType" value={education.courseType} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group controlId="formPercentage">
                        <Form.Label>Percentage</Form.Label>
                        <Form.Control type="number" name="percentage" value={education.percentage} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Add Education
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EducationModal;
