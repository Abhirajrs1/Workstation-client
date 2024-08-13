import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaPlus } from 'react-icons/fa';
import { AuthContext } from '../../../Context/UserContext';
import Navigation from '../../../Components/Navigation';
import WorkExperienceModal from './WorkExperienceModal';
import './WorkExperience.css';

const WorkExperience = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const { user, loading } = useContext(AuthContext);

  const handleOpenModal = () => {
    setModalType('workExperience');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!user && !loading) {
    navigate('/employee-login');
  }

  return (
    <div>
      <Navigation />
      <div className="workexperience-container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mb-3">Work Experience</h2>
            <p className="text-muted mb-4">
              List your past work experience to help employers understand your professional background.
            </p>

            <div className="workexperience-section">
              {user?.WorkExperience && user.WorkExperience.length > 0 ? (
                <>
                  <div className="d-flex align-items-center">
                    <FaBriefcase className="me-3" size={20} color="#6c757d" />
                    <h3 className="flex-grow-1">Work Experience</h3>
                    <FaPlus
                      size={20}
                      color="#0d6efd"
                      onClick={handleOpenModal}
                      style={{ cursor: 'pointer', marginLeft: 'auto' }}
                    />
                  </div>
                  {user.WorkExperience.map((experience, index) => (
                    <div key={index} className="workexperience-card">
                      <div className="workexperience-details">
                        <h5>{experience.jobTitle} at {experience.companyName}</h5>
                        <p>{experience.city}, {experience.state}, {experience.country}</p>
                        <p>{experience.startDate} - {experience.endDate}</p>
                        <p>Salary: {experience.salary ? `$${experience.salary}` : 'N/A'}</p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="workexperience-item d-flex align-items-center py-3 border-bottom">
                  <FaBriefcase className="me-3" size={20} color="#6c757d" />
                  <span className="flex-grow-1">Add work experience</span>
                  <FaPlus size={20} color="#0d6efd" onClick={handleOpenModal} style={{ cursor: 'pointer' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {modalType === 'workExperience' && (
        <WorkExperienceModal show={showModal} handleClose={handleCloseModal} />
      )}
    </div>
  );
};

export default WorkExperience;
