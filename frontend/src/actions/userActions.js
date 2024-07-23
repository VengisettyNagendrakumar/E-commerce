import { userLoginRequest, userLoginSuccess, userLoginFail, userLogout} from '../store/user-slice'
import axios from 'axios';
import { userListReset } from '../store/userList';

import { userDetailReset } from '../store/user-details';
import { clearMyOrders } from '../store/myorders';
export const login=(email,password)=>async(dispatch) => {
   try{
        dispatch(userLoginRequest())
        const {config}={
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const {data}=await axios.post('/api/users/login/',
            {'username': email, 'password': password},
            config
        ) //to get user token
        //This makes a POST request to the login API endpoint with the email and password

       dispatch(userLoginSuccess(data))

        localStorage.setItem('userInfo',JSON.stringify(data))
   }
   catch(error){
    dispatch(userLoginFail(error.response && error.response.data.detail 
        ? error.response.data.detail 
        : error.message,))
   }
}

export const logout=()=>async(dispatch)=>{
    localStorage.removeItem('userInfo')
    dispatch(userLogout())
    dispatch(clearMyOrders())
    dispatch(userListReset())

}