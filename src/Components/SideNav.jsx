import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';
import { FaPlus, FaBriefcase, FaPhone, FaUsers, FaUserTie, FaChartBar, FaFolder, FaTimes } from 'react-icons/fa';

function SideNav() {
  return (
    <div className="side-nav">
      <div className="nav-header">
        <FaTimes className="close-icon" />
        <span>Collapse</span>
      </div>
      <Link to="/create-new" className="side-nav-link create-new">
        <FaPlus /> <span>Create new</span>
      </Link>
      <Link to="/recruiter-listJob" className="side-nav-link">
        <FaBriefcase /> <span>Jobs</span>
      </Link>
      <Link to="/phone-calls" className="side-nav-link">
        <FaPhone /> <span>Phone calls</span>
      </Link>
      <Link to="/smart-sourcing" className="side-nav-link">
        <FaUsers /> <span>Smart Sourcing</span>
      </Link>
      <Link to="/candidates" className="side-nav-link">
        <FaUserTie /> <span>Candidates</span>
      </Link>
      <Link to="/interviews" className="side-nav-link">
        <FaUsers /> <span>Interviews</span>
      </Link>
      <Link to="/analytics" className="side-nav-link">
        <FaChartBar /> <span>Analytics</span>
      </Link>
      <Link to="/tools" className="side-nav-link">
        <FaFolder /> <span>Tools</span>
      </Link>
    </div>
  );
}

export default SideNav;