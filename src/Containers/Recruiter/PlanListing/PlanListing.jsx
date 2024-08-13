import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../Services/Interceptor/recruiterInterceptor.js';
import './PlanListing.css';

const PlanListing = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axiosInstance.get('/recruiter-getPlans');
        console.log(response); 
        setPlans(response.data.plans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="planslisting-container">
      <h2 className="planslisting-title">Pick the Best Plan</h2>
      <p className="planslisting-subtitle">
        Take your desired plan to get access to our content easily. We offer special license offers to our users.
      </p>
      <div className="planslisting-grid">
        {plans.map(plan => (
          <div className="planslisting-card" key={plan._id}>
            <h3 className="planslisting-name">{plan.planName}</h3>
            <p className="planslisting-amount">${plan.amount} <span className="planslisting-per-month"></span></p>
            <p className="planslisting-description">{plan.description}</p>
            <p className="planslisting-planType">
              Duration: {plan.planType === 'duration' ? `${plan.planDuration} Months` : 'Lifetime'}
            </p>
            <button className="planslisting-button">Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanListing;
