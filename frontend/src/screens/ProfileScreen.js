import React,{useState,useEffect}from 'react'
import {Link, redirect, useLocation, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message';
import {Row,Col,Form,Button,Table} from 'react-bootstrap'
import {LinkContainer} from  'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { getUserDetails } from '../actions/userDetailActions';
import { updateUserDetails } from '../actions/userUpdateDetails';
import { userUpdateReset } from '../store/user-update';
import {listMyOrders} from '../actions/myOrderActions'
function ProfileScreen() {
    const[name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    const dispatch=useDispatch();

    const userDetail=useSelector(state=>state.userDetails)


    const {loading,error,user}=userDetail
    const navigate=useNavigate();

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo}=userLogin


    const userUpdate=useSelector(state=>state.userUpdate)
    const {success}=userUpdate

    const myOrders=useSelector(state=>state.myOrders)
    const {loading:loadingOrders,error:errorOrders,orders}=myOrders

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name || success || userInfo._id!==user._id) { //if success is true we nned to reset state
                dispatch(userUpdateReset())
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders()) //get user orders 
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, navigate,user._id, userInfo,success]);
    
   const submitHandler=(e)=>{
    e.preventDefault()
    if (password!==confirmPassword){
        setMessage('Passwords do not match')
       
    }
    else{
        dispatch(updateUserDetails({id:user._id,name,email,password}))
        setMessage('')
    }
   }
  return (
    <Row>
        <Col md={3}>
        <h2>Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}  required></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
             <Form.Label>Password</Form.Label>
             <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}  ></Form.Control>
         </Form.Group>
         <Form.Group controlId='passwordConfirm'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}   ></Form.Control>
         </Form.Group>
         <Button type='submit' variant='primary' className='my-4'>
            Update
         </Button>
            </Form>
        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ?(
            <Loader />
          ):errorOrders?(
            <Message variant='danger'>{errorOrders}</Message>
          ):(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Order Date</th>
                        <th>Total Price</th>
                        <th>Paid</th>
                        <th>Delivered</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid ?order.paidAt.substring(0,10):(
                                <i className='fas fa-times' style={{color:'red'}}></i>
                            )}</td>
                            <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button className='btn-sm'>Details</Button>
                            </LinkContainer>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
          )}
            
        </Col>
    </Row>
  )
}

export default ProfileScreen

