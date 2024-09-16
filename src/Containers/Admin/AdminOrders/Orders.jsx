import React, { useContext, useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axiosInstance from '../../../Services/Interceptor/adminInterceptor.js';
import './Orders.css';
import AdminSideNavigation from '../../../Components/AdminSideNavigation';
import AdminNavigation from '../../../Components/AdminNavigation';
import { AdminAuth } from '../../../Context/AdminContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Orders() {
    const { Authenticated, loading } = useContext(AdminAuth);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get(`/admin-orders?page=${page}&limit=${limit}`);
                if (response.data.success) {
                    setOrders(response.data.orders);
                    setTotal(response.data.total);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [page]);

    const handlePageClick = (data) => {
        setPage(data.selected + 1);
    };

    useEffect(() => {
        if (!Authenticated && !loading) {
            navigate('/admin-login');
        }
    }, [Authenticated, navigate, loading]);

    const viewOrder = (id) => {
        navigate(`/admin-orderdetails/${id}`);
    };

    return (
        <>
            <AdminSideNavigation />
            <AdminNavigation />
            <div className="admin-orders-panel">
                <div className="admin-orders-content-wrapper">
                    <div className="admin-orders-header">
                        <h1>Order Management</h1>
                    </div>
                    <div className="admin-orders-section">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Sl. No</th>
                                    <th>Recruiter Name</th>
                                    <th>Plan Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order._id}>
                                        <td>{index + 1}</td>
                                        <td>{order.recruiterName}</td>
                                        <td>{order.planName}</td>
                                        <td>${order.amount}</td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => viewOrder(order._id)}
                                            >
                                                View
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div className="admin-orders-pagination-wrapper">
                            <ReactPaginate
                                previousLabel={<FaArrowLeft />}
                                nextLabel={<FaArrowRight />}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={Math.ceil(total / limit)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'admin-orders-pagination'}
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

export default Orders;
