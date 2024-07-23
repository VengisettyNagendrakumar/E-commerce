import React,{useState,useEffect}from 'react'
import {Link, redirect, useLocation, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message';
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
function LoginScreen() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const dispatch=useDispatch();
    const location=useLocation();
    const redirect=location.search?location.search.split('=')[1]:'/'

    const userLogin=useSelector(state=>state.userLogin)

    const navigate=useNavigate();

    const {loading,error,userInfo}=userLogin
    useEffect(()=>{
        if(userInfo){ //if user s alredy login navigating to same page
            navigate(redirect)
        }
    },[dispatch,redirect,userInfo])
    
   const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(login(email,password))
   }
  return (
   <FormContainer>
    <h1>Sign In</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>
         <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}  required></Form.Control>
         </Form.Group>
         <Form.Group controlId='password'>
             <Form.Label>Password</Form.Label>
             <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}  required></Form.Control>
         </Form.Group>
         <Button type='submit' variant='primary' className='my-4'>
             Sign In
         </Button>
    </Form>
    <Row className='py-3'>
        <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}  style={{ textDecoration: 'none' }}>Register </Link>
        </Col>
        
    </Row>
   </FormContainer>
  )
}

export default LoginScreen
