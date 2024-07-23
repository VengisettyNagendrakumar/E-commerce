import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { userListDetails } from '../actions/userListAction';
import { userDelete } from '../actions/userDelete';
function UserListScreen() {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;
    const navigate = useNavigate();
    
    const userInfo = useSelector(state => state.userLogin.userInfo);
   
    const deleteUser = useSelector(state => state.userDelete)
    const { success: successDelete } = deleteUser;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(userListDetails());

        }
        else{
            navigate('/login');
        }
    }, [dispatch,navigate,successDelete,userInfo]);
    
    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(userDelete(id));
        }
        
    }

    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.isAdmin ? <i className="fas fa-check" style={{color:'green'}}/> : <i className="fas fa-times"style={{color:'red'}} />}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm"><i className="fas fa-edit"></i></Button>
                                    </LinkContainer>

                                    <Button variant="light" className="btn-sm" onClick={()=>deleteHandler(user._id)}><i className="fas fa-trash"></i></Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default UserListScreen;
