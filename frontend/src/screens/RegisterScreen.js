import React,{useState,useEffect}from 'react'
import {Link, redirect, useLocation, useNavigate} from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message';
import {Row,Col,Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../actions/userRegisterAction';
import FormContainer from '../components/FormContainer';
function RegisterScreen() {
    const[name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    const dispatch=useDispatch();
    const location=useLocation();
    const redirect=location.search?location.search.split('=')[1]:'/'

    const userRegister=useSelector(state=>state.userRegister)

    const navigate=useNavigate();

    const {loading,error,userInfo}=userRegister
    useEffect(()=>{
        if(userInfo){ //if user s alredy login navigating to same page
            navigate(redirect)
        }
    },[dispatch,redirect,userInfo])
    
   const submitHandler=(e)=>{
    e.preventDefault()
    if (password!==confirmPassword){
        setMessage('Passwords do not match')
       
    }
    else{
        dispatch(register(name,email,password))

    }
   }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
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
             <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}  required></Form.Control>
         </Form.Group>
         <Form.Group controlId='passwordConfirm'>
             <Form.Label>Confirm Password</Form.Label>
             <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}  required ></Form.Control>
         </Form.Group>
         <Button type='submit' variant='primary' className='my-4'>
            Register
         </Button>
            </Form>
            <Row className='py-3'>
        <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/login'} style={{ textDecoration: 'none' }} >Sign In </Link>
        </Col>
        
    </Row>
            
    </FormContainer>

  );
}

export default RegisterScreen
