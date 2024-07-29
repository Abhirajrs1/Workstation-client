import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './SkillModal.css';

const SkillModal = ({ show, handleClose, addSkill }) => {
    const [skill, setSkill] = useState('');

    const handleChange = (e) => {
        setSkill(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addSkill(skill);
        setSkill('')
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Skill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSkill">
                        <Form.Label>Skill</Form.Label>
                        <Form.Control type="text" value={skill} onChange={handleChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Add Skill
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SkillModal;
