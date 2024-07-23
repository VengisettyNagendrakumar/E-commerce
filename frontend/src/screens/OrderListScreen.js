

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { listallOrders } from '../actions/myOrderActions';

function OrderListScreen() {
    const dispatch = useDispatch();
    const orderList = useSelector(state => state.allOrders);
    const { loading, error, orders } = orderList;
    const navigate = useNavigate();
    
    const userInfo = useSelector(state => state.userLogin.userInfo);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listallOrders());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo]);

    return (
        <div>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th> {/* Adding a header for the Details column */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? 
                                    (
                                        order.paidAt?.substring(0, 10)
                                    )
                                    : <i className="fas fa-times" style={{ color: 'red' }} />}
                                </td>
                                <td>
                                    {order.isDelivered ? 
                                    (
                                        order.deliveredAt?.substring(0, 10)
                                    )
                                    : <i className="fas fa-times" style={{ color: 'red' }} />}
                                </td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant="light" className="btn-sm">Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default OrderListScreen;