import React, { useContext, useState } from 'react';
import './Modal.css';
import { AuthContext } from '../../../Context/UserContext';
import axios from 'axios';
import axiosInstance from '../../../Services/Interceptor/candidateInterceptor.js';

function Modal({ show, onClose, type }) {
    const { user,setUser } = useContext(AuthContext);


    const initialEducation={
      level:'',
      field:''
    }
    const initialSkill={
      userSkills:'',
      yearsOfExperience:''
    }

    const [education, setEducation] = useState(initialEducation);
    const [skill, setSkill] = useState(initialSkill);

    const handleEducationChange = (e) => {
        const { name, value } = e.target;
        setEducation((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSkillChange = (e) => {
        const { name, value } = e.target;
        setSkill((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (type === 'education') {
                
                response = await axiosInstance.post(`/employee-addQualification/education/${user.email}`, {
                    education
                });
                setEducation(initialEducation)
            } else if (type === 'skill') {
                response = await axiosInstance.post(`/employee-addQualification/skill/${user.email}`, {
                    skill
                });
                setSkill(initialSkill)
            }
            if (response.data.success) {
              setUser(response.data.user)
              localStorage.setItem('user', JSON.stringify(response.data.user));
              console.log(response.data);
              onClose()
            }

        } catch (error) {
            console.log(error);
        }
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{type === 'education' ? 'Add education' : 'Add skill'}</h2>
                        <button className="close-button" onClick={onClose}>
                            ×
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {type === 'education' ? (
                            <>
                                <div className="form-group">
                                    <label htmlFor="educationLevel">Level of education*</label>
                                    <input
                                        type="text"
                                        id="educationLevel"
                                        name="level"
                                        value={education.level}
                                        onChange={handleEducationChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="fieldOfStudy">Field of study</label>
                                    <input
                                        type="text"
                                        id="fieldOfStudy"
                                        name="field"
                                        value={education.field}
                                        onChange={handleEducationChange}
                                    />
                                </div>
                                
                            </>
                        ) : (
                            <>
                                <div className="form-group">
                                    <label htmlFor="skill">Skill*</label>
                                    <input
                                        type="text"
                                        id="skill"
                                        name="userSkills"
                                        value={skill.userSkills}
                                        onChange={handleSkillChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="yearsOfExperience">Years of experience</label>
                                    <input
                                        type="number"
                                        id="yearsOfExperience"
                                        name="yearsOfExperience"
                                        value={skill.yearsOfExperience}
                                        onChange={handleSkillChange}
                                    />
                                </div>
                            </>
                        )}
                        <div className="modal-actions">
                            <button type="button" onClick={onClose}>
                                Cancel
                            </button>
                            <button type="submit" className="save-button">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
