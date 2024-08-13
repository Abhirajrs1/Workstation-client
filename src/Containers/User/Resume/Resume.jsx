import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronRight, FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import Navigation from '../../../Components/Navigation';
import EducationModal from './EducationModal';
import SkillModal from './SkillModal.jsx';
import './Resume.css';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';

function Resume() {
    const { user, loading, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showSkillModal, setShowSkillModal] = useState(false);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            navigate("/employee-login");
        } else {
            if (user?.Qualification?.education) {
                setEducations(user.Qualification.education);
            }
            if (user?.Qualification?.skills) {
                setSkills(user.Qualification.skills);
            }
        }
    }, [isAuthenticated, navigate, loading, user]);



    const handleAddEducation = async (education) => {
        try {
           const response = await axiosInstance.post('/employee-addresumeeducation', { education });
           if(response.data.success){
                setEducations([...educations, education]);
                await axiosInstance.post( `/employee-addQualification/education/${user.email}`, { education });
           }
        } catch (error) {
            console.error('Error adding education:', error);
        }
    };

    const handleAddSkill = async (skill) => {
        try {
            const response = await axiosInstance.post('/employee-addresumeskill', { skill });
            if(response.data.success){
                setSkills([...skills, skill]);
                await axiosInstance.post(`/employee-addQualification/skill/${user.email}`, { skill });
            }

        } catch (error) {
            console.error('Error adding skill:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    const userAddress = user.useraddress && user.useraddress.length > 0 ? user.useraddress[0] : {};

    return (
        <>
        <Navigation/>
        <Container className="resume mt-4">
            <Row className="resume-header align-items-center">
                <Col xs="auto" onClick={() => navigate('/employee-profile')}>
                    <button className="back-button">←</button>
                </Col>
                <Col>
                    <h2 className="fw-bold">{user.username}</h2>
                </Col>
                <Col xs="auto">
                    <div className="avatar">{user.username[0]}</div>
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
                            <span>{user.contact || 'N/A'}</span>
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
            <Row className="resume-education">
                <Col>
                    <div className="education-header">
                        <h4 className='fw-bold'>Education</h4>
                        <Button variant="link" className="add-education-button" onClick={() => setShowEducationModal(true)}>
                            <FaPlus className="icon" />
                        </Button>
                    </div>
                    {educations.length > 0 ? (
                        educations.map((edu, index) => (
                            <div key={index} className="education-item">
                                <h5>{edu.degree} in {edu.specialization}</h5>
                                <p>{edu.collegeName}, {edu.city}, {edu.state}</p>
                                <p><span>{edu.courseType}</span> | {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                                <p>Score: {edu.percentage}%</p>
                            </div>
                        ))
                    ) : (
                        <p>No education details available.</p>
                    )}
                </Col>
            </Row>
            <Row className="resume-skills">
                <Col>
                    <div className="skills-header">
                        <h4 className='fw-bold'>Skills</h4>
                        <Button variant="link" className="add-skill-button" onClick={() => setShowSkillModal(true)}>
                            <FaPlus className="icon" />
                        </Button>
                    </div>
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <div key={index} className="skill-item">
                                <p>{skill}</p>
                            </div>
                        ))
                    ) : (
                        <p>No skills available.</p>
                    )}
                </Col>
            </Row>
        </Container>
        <EducationModal show={showEducationModal} handleClose={() => setShowEducationModal(false)} addEducation={handleAddEducation} />
        <SkillModal show={showSkillModal} handleClose={() => setShowSkillModal(false)} addSkill={handleAddSkill} />
        </>
    );
}

export default Resume;
