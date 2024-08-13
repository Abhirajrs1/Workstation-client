import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaCog, FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import Navigation from '../../../Components/Navigation';
import ProfileEducationModal from './ProfileEducationModal';
import ProfileSkillModal from './ProfileSkillModal';
import './Qualification.css';

const Qualifications = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { user, loading } = useContext(AuthContext);

  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!user && !loading) {
    navigate('/employee-login');
  }

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <Navigation />
      <div className="qualification-container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mb-3">Qualifications</h2>
            <p className="text-muted mb-4">
              We use these details to show you jobs that match your unique skills and experience.
            </p>

            {/* Education Section */}
            <div className="education-section">
              {user?.Qualification?.education && user.Qualification.education.length > 0 ? (
                <>
                  <div className="d-flex align-items-center">
                    <FaGraduationCap className="me-3" size={20} color="#6c757d" />
                    <h3 className="flex-grow-1">Education</h3>
                    <FaPlus
                      size={20}
                      color="#0d6efd"
                      onClick={() => handleOpenModal('education')}
                      style={{ cursor: 'pointer', marginLeft: 'auto' }}
                    />
                  </div>
                  {user.Qualification.education.map((edu, index) => (
                    <div key={index} className="education-card">
                      <div className="education-details">
                        <h5>{edu.degree} in {edu.specialization}</h5>
                        <p>{edu.collegeName}, {edu.city}, {edu.state}</p>
                        <p><span>{edu.courseType}</span> | {formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                        <p>Score: {edu.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="qualification-item d-flex align-items-center py-3 border-bottom">
                  <FaGraduationCap className="me-3" size={20} color="#6c757d" />
                  <span className="flex-grow-1">Add education</span>
                  <FaPlus size={20} color="#0d6efd" onClick={() => handleOpenModal('education')} style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>

            {/* Skills Section */}
            <div className="skills-section mt-4">
              {user?.Qualification?.skills && user.Qualification.skills.length > 0 ? (
                <>
                  <div className="d-flex align-items-center">
                    <FaCog className="me-3" size={20} color="#6c757d" />
                    <h3 className="flex-grow-1">Skills</h3>
                    <FaPlus
                      size={20}
                      color="#0d6efd"
                      onClick={() => handleOpenModal('skill')}
                      style={{ cursor: 'pointer', marginLeft: 'auto' }}
                    />
                  </div>
                  {user.Qualification.skills.map((skill, index) => (
                    <div key={index} className="qualification-item d-flex align-items-center py-1 px-4">
                      <div className="flex-grow-1">
                        <p>{skill}</p>
                      </div>
                      {index !== user.Qualification.skills.length - 1 && (
                        <hr className="qualification-divider mx-3 my-0" />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <div className="qualification-item d-flex align-items-center py-3 border-bottom">
                  <FaCog className="me-3" size={20} color="#6c757d" />
                  <span className="flex-grow-1">Add skill</span>
                  <FaPlus size={20} color="#0d6efd" onClick={() => handleOpenModal('skill')} style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalType === 'education' && (
        <ProfileEducationModal show={showModal} handleClose={handleCloseModal} />
      )}
      {modalType === 'skill' && (
        <ProfileSkillModal show={showModal} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Qualifications;
