import React, { useEffect, useContext, useState } from 'react';
import AdminSideNavigation from '../../../Components/AdminSideNavigation';
import AdminNavigation from '../../../Components/AdminNavigation';
import { AdminAuth } from '../../../Context/AdminContext';
import { Bar } from 'react-chartjs-2'; 
import Chart from 'chart.js/auto'; 
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; 
import axiosInstance from '../../../Services/Interceptor/adminInterceptor.js';

function AdminHome() {
  const { Authenticated, loading } = useContext(AdminAuth);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    recruiters: 0,
    candidates: 0,
    jobs: 0,
  });

  useEffect(() => {
    if (!Authenticated && !loading) {
      navigate('/admin-login');
    }
    const fetchStats=async()=>{
      try {
        const response=await axiosInstance.get('/admin-getStats')
        if(response.data.success){
          setStats(response.data.stats)
        }else{
          console.log('Failed to fetch statistics');
        }
      } catch (error) {
        console.error('An error occurred while fetching statistics', error);
      }
    }
    if(Authenticated){
      fetchStats()
    }
  }, [Authenticated, navigate, loading]);

  const data = {
    labels: ['Recruiters', 'Candidates', 'Jobs'],
    datasets: [
      {
        label: 'STATISTICS',
        data: [stats.recruiters, stats.candidates, stats.jobs],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <AdminSideNavigation />
      <AdminNavigation />
      <div className="admin-home-dashboard">
        <div className="admin-home-stats-cards">
          <div className="admin-home-card" onClick={() => navigate('/admin-recruiters')}>
            <h3>Recruiters</h3>
            <p>{stats.recruiters}</p>
          </div>
          <div className="admin-home-card" onClick={() => navigate('/admin-candidates')}>
            <h3>Candidates</h3>
            <p>{stats.candidates}</p>
          </div>
          <div className="admin-home-card" onClick={() => navigate('/admin-jobs')}>
            <h3>Jobs</h3>
            <p>{stats.jobs}</p>
          </div>
        </div>

        <div className="admin-home-chart-container">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
