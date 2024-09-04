import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/adminInterceptor';
import './Plans.css';
import AdminSideNavigation from '../../../Components/AdminSideNavigation';
import AdminNavigation from '../../../Components/AdminNavigation';
import { AdminAuth } from '../../../Context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaEdit,FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

function Plans() {
    const { Authenticated, loading } = useContext(AdminAuth);
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await axiosInstance.get(`/admin-plans?page=${page}&limit=${limit}`);
                if (response.data.success) {
                    setPlans(response.data.plans);
                    setTotal(response.data.total);
                }
            } catch (error) {
                console.error('Error fetching plans:', error);
            }
        };
        fetchPlans();
    }, [page]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    useEffect(() => {
        if (!Authenticated && !loading) {
            navigate('/admin-login');
        }
    }, [Authenticated, navigate, loading]);

    const editPlan = (id) => {
        navigate(`/admin-editPlans/${id}`);
    };

    const addPlan = () => {
        navigate('/admin-addPlans');
    };

    const deletePlan = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            try {
                const response = await axiosInstance.delete(`/admin-deletePlan/${id}`);
                if (response.data.success) {
                    Swal.fire(
                        'Deleted!',
                        'The plan has been deleted.',
                        'success'
                    );
                    setPlans(plans.filter(plan => plan._id !== id));
                } else {
                    Swal.fire(
                        'Error!',
                        'Failed to delete the plan.',
                        'error'
                    );
                }
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'An error occurred while deleting the plan.',
                    'error'
                );
            }
        }
    };

    return (
        <>
            <AdminSideNavigation />
            <AdminNavigation />
            <div className="plans-panel">
                <div className="plans-content-wrapper">
                    <div className="plans-management-header">
                        <h1>Plan Management</h1>
                    </div>
                    <Button 
                        variant="primary" 
                        onClick={addPlan} 
                        className="plans-add-button"
                    >
                        Add Plan
                    </Button>
                    <div className="plans-management-section">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Plan Name</th>
                                    <th>Price</th>
                                    <th>Description</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((plan, index) => (
                                    <tr key={plan._id}>
                                        <td>{index + 1}</td>
                                        <td>{plan.planName}</td>
                                        <td>${plan.amount}</td>
                                        <td>{plan.description}</td>
                                        <td>{plan.planType === 'duration' ? plan.planDuration : 'Lifetime access'}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                onClick={() => editPlan(plan._id)}
                                            >
                                                <FaEdit /> Edit
                                            </Button>
                                            <FaTrash
                                                className="icon-action icon-delete"
                                                onClick={() => deletePlan(plan._id)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="plans-pagination-wrapper">
                            <ReactPaginate
                                previousLabel={<FaArrowLeft />}
                                nextLabel={<FaArrowRight />}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={Math.ceil(total / limit)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                subContainerClassName={'pages pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Plans;
