import React, { useState, useEffect } from 'react';
import {  Button,Row,Col,ListGroup,Image,Card, ListGroupItem } from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader'
import {PayPalButton} from 'react-paypal-button-v2'
import {getorderDetails,payOrder} from '../actions/orderDetailAction'
import { orderPayReset } from '../store/order-pay';
import { deliverOrder } from '../actions/orderDetailAction';
import { orderDeliveredReset } from '../store/order-delivered';
function OrderScreen() {
    const {orderId}=useParams();
    const dispatch = useDispatch();


    const [sdkReady, setSdkReady] = useState(false);

    const navigate = useNavigate();
    const orderDetails=useSelector(state=>state.orderDetails)
    const { order, error, loading } = orderDetails;

    const orderPay=useSelector(state=>state.orderPay)
    const { success:successPay, error: errorPay,loading:loadingPay } = orderPay;

    const orderDeliver=useSelector(state=>state.orderDelivered)
    const { success:successDeliver, error: errorDeliver,loading:loadingDeliver } = orderDeliver;

    const userLogin=useSelector(state=>state.userLogin)
    const { userInfo } = userLogin;


    const itemsPrice = order?.orderItems
    ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    : 0;
    

    useEffect(()=>{
        
        if(!userInfo){
            navigate('/login');
        }

        if (!order || successPay || order._id!==Number(orderId) || successDeliver){
            dispatch(orderPayReset());
            dispatch(orderDeliveredReset()); //if success deliver is true so order is delivered so we are resetting
            dispatch(getorderDetails(orderId))

        }
        else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }
            else{
                setSdkReady(true)
            }
        }
       
    },[dispatch,order,orderId,successPay,successDeliver])

    const successPaymentHandler=(paymentResult)=>{
        dispatch(payOrder(orderId,paymentResult));

    }

    const addPayPalScript=()=>{
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.paypal.com/sdk/js?client-id=AWuNSwojCACIdXwQi_8QrmXGevsilgwU0DszyGsvnIkAgRCV-mkeJGjDwbTZDkP2ja5ii4i8sXfMqNCI';
        script.async = true;
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script);
    }



    const deliverHandler=()=>{
        dispatch(deliverOrder(order));
    }
    
  return (
    loading?
    (<Loader/>    
    ):error?(
        <Message variant='danger'>{error}</Message>
    ):
        (<div>
            <h1>Order:{order._id}</h1>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
            <ListGroup.Item>
                <h2>Shipping</h2>
                <p><strong>Name:</strong>{order.user.name}</p>
                <p><strong>Email:</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>

                <p>
                    <strong>Shipping:</strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},

                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                {order.isDelivered ?(
                    <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                ):(
                    <Message variant='warning'>Not Delivered</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                    
                </p>
                {order.isPaid ?(
                    <Message variant='success'>Paid on {order.paidAt}</Message>
                ):(
                    <Message variant='warning'>Not Paid</Message>
                )}
            </ListGroup.Item>

            <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length ===0 ?<Message variant='info'>
                    order is empty
                </Message>:
                (
                    <ListGroup variant='flush'>
                        {order.orderItems.map((item,index)=>(
                            <ListGroup.Item>
                                <Row key={index}>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                    {item.qty} x ${item.price}=${(item.qty * item.price).toFixed(2)}
                                </Col>
                                
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
    }
            </ListGroup.Item>
            </ListGroup>
            </Col>

            <Col md={4}>
            <Card>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>Items:</Col>
                        <Col>${itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                        Shipping:
                        </Col>
                        <Col>
                        ${order.shippingPrice}
                        </Col>

                    </Row>
                </ListGroup.Item>


                <ListGroup.Item>
                    <Row>
                        <Col>
                        Tax:
                        </Col>
                        <Col>
                        ${order.taxPrice}
                        </Col>
                        
                    </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Row>
                        <Col>
                        Total:
                        </Col>
                        <Col>
                        ${order.totalPrice}
                        </Col>
                        
                    </Row>
                </ListGroup.Item>

                {!order.isPaid && (
                    <ListGroup.Item>
                        {loadingPay && <Loader/>}
                        {!sdkReady ?(
                           <Loader/>
                        ):(
                            <PayPalButton 
                                amount={order.totalPrice} 
                                onSuccess={successPaymentHandler} 
                            />
                        )
                        }
                        
                    </ListGroup.Item>
                )}
                 {loadingDeliver && <Loader />}
                                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                                        </Button>
                                    </ListGroup.Item>)}
            
    
                
                </ListGroup> 
            </Card>
            </Col>
        </Row>
        </div>)
  )
}

export default OrderScreen;

