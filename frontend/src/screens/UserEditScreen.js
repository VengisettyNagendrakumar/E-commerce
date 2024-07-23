


import React, {useState, useEffect} from 'react'
import { Link ,useNavigate,useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userDetailActions'; 
import { updateUserByAdmin } from '../actions/userUpdateByAdminAction'
import { userUpdateByAdminReset } from '../store/userUpdateByAdmin'
function EditUserScreen() {
    const match = useParams();
    const userId = match.id
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setAdmin] = useState(false)
    
    const dispatch = useDispatch()
    let navigate = useNavigate()
    
 
 
    const userDetails = useSelector(state => state.userDetails)
    const { error,  loading , user} = userDetails

    const userUpdateByAdmin = useSelector(state => state.userUpdateByAdmin)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdateByAdmin
 
    useEffect(()=>{

    if(successUpdate){
      dispatch(userUpdateByAdminReset())
      navigate('/admin/userlist')
    }
    else{
      if(! user.name || user._id !== Number(userId)){
        dispatch(getUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setAdmin(user.isAdmin)
      }
    }

      
      
    },[user.name, user.email, user.isAdmin,successUpdate,navigate])
 
 
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUserByAdmin({_id:user._id,name, email, isAdmin}))  //update user by admin action is dispatched with userId and updated details
    }
 
  return (
    <div>
        <Link to ='/admin/userlist'>
        Go Back
        </Link>
        <FormContainer>
            <h1>Edit user</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant = 'danger'>{errorUpdate}</Message>}
            {successUpdate && <Message variant ='success'>User Updated Successfully</Message>}
            {loading ? <Loader /> :error ? <Message variant = 'danger'>{error}</Message> :(
                  <Form onSubmit = {submitHandler}>
                  <Form.Group controlId = 'name'>
                              <Form.Label>Name</Form.Label>
                              <Form.Control  type='name' placeholder = 'Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Form.Group controlId = 'email'>
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control  type='email' placeholder = 'Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                  </Form.Group>
      
                  <Form.Group controlId = 'isAdmin' className='py-3' >
                              <Form.Check  type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setAdmin(e.target.checked)}></Form.Check>
                  </Form.Group>
      
                  <Button type='submit' variant = 'primary'>Update</Button>
                  </Form>
            )}
        </FormContainer>
    </div>
  )
}
 
export default EditUserScreen