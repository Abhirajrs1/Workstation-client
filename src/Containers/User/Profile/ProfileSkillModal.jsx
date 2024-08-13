import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AuthContext } from '../../../Context/UserContext';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';
import './ProfileSkillModal.css';

const ProfileSkillModal = ({ show, handleClose }) => {
  const { user, setUser } = useContext(AuthContext);
  const [skill, setSkill] = useState('');

  const handleChange = (e) => {
    setSkill(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/employee-addQualification/skill/${user.email}`, {
        skill
      });
      if (response.data.success) {
        setUser(response.data.user);
        await axiosInstance.post('/employee-addresumeskill', { skill });
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setSkill('')
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className="profile-skill-modal">
      <Modal.Header closeButton>
        <Modal.Title>Add Skill</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSkill">
            <Form.Label>Skill</Form.Label>
            <Form.Control
              type="text"
              value={skill}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Skill
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProfileSkillModal;
