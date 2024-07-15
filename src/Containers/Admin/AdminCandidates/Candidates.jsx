
import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/adminInterceptor';
import './Candidates.css'
function Candidates() {
    const [candidates,setCandidates]=useState([])
    useEffect(()=>{
        const fetchCandidates=async()=>{
            try {
                const response=await axiosInstance.get('/admin-candidates')
                setCandidates(response.data.candidates)
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        }
        fetchCandidates()
    },[])
    const toggleBlockStatus = async (id) => {
        try {
            const candidate = candidates.find(c => c.id === id);
            const updatedStatus = !candidate.blocked;
            await axios.put(`/admin-candidates/${id}/block`, { blocked: updatedStatus });

            // Update the state with the new status
            setCandidates(candidates.map(c => 
                c.id === id ? { ...c, blocked: updatedStatus } : c
            ));
        } catch (error) {
            console.error('Error updating block status:', error);
        }
    };

  return (
    <div className="admin-panel">
      <h1>User Management</h1>
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
          {candidates.map((candidate, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>
                <Button
                  variant={candidate.blocked ? 'success' : 'danger'}
                  onClick={() => toggleBlockStatus(user.id)}
                >
                  {candidate.blocked ? 'Unblock' : 'Block'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Candidates
