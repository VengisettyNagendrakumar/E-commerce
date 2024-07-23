import {userRegisterRequest,userRegisterFail,userRegisterSuccess,userLogout} from '../store/register-slice'
import axios from 'axios';
import { userLoginSuccess } from '../store/user-slice';
export const register=(name,email,password)=>async(dispatch) => {
   try{
        dispatch(userRegisterRequest())
        const {config}={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data}=await axios.post('/api/users/register/',
            {'name':name,'email': email, 'password': password},
            config
        ) //to get user token
        //This makes a POST request to the login API endpoint with the email and password

       dispatch(userRegisterSuccess(data))
        //after registration successful we need to login immediately
        dispatch({
            type:userLoginSuccess,
            payload: data,
        })
        localStorage.setItem('userInfo',JSON.stringify(data))
   }
   catch(error){
    dispatch(userRegisterFail(error.response && error.response.data.detail 
        ? error.response.data.detail 
        : error.message,))
   }
}

export const logout=()=>async(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
}