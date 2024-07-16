import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/adminInterceptor';
import './Recruiters.css';
import AdminSideNavigation from '../../../Components/AdminSideNavigation';
import AdminNavigation from '../../../Components/AdminNavigation';
import { AdminAuth } from '../../../Context/AdminContext';
import { useNavigate } from 'react-router-dom';
function Recruiters() {
    const {Authenticated,loading}=useContext(AdminAuth)
    const navigate=useNavigate()
    const [recruiters, setRecruiters] = useState([]);


    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const response = await axiosInstance.get('/admin-recruiters');
                if (response.data.success) {
                    setRecruiters(response.data.recruiters);
                }
            } catch (error) {
                console.error('Error fetching recruiters:', error);
            }
        };
        fetchRecruiters();
    }, []);

    useEffect(()=>{
        if(!Authenticated && !loading){
          navigate('/admin-login')
        }
      },[Authenticated,navigate,loading])

    const toggleBlockStatus = async (id) => {
        try {
            const response = await axiosInstance.put(`/admin-recruiters/${id}/block`);
            if (response.data.success) {
                setRecruiters(recruiters.map(c =>
                    c._id === id ? { ...c, block: response.data.block } : c
                ));
            }
        } catch (error) {
            console.error('Error updating block status:', error);
        }
    };

  return (
    <>
            <AdminSideNavigation />
            <AdminNavigation />
            <div className="admin-panel">
                <div className="content-wrapper">
                    <div className="user-management-header">
                        <h1>Recruiter Management</h1>
                    </div>
                    <div className="user-management-section">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recruiters.map((recruiter, index) => (
                                    <tr key={recruiter._id}>
                                        <td>{index + 1}</td>
                                        <td>{recruiter.recruitername}</td>
                                        <td>{recruiter.email}</td>
                                        <td>
                                            <Button
                                                variant={recruiter.block ? 'success' : 'danger'}
                                                onClick={() => toggleBlockStatus(recruiter._id)}
                                            >
                                                {recruiter.block ? 'Unblock' : 'Block'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
  )
}

export default Recruiters
