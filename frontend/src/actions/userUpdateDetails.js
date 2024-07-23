import {userUpdateRequest,userUpdateFail,userUpdateSuccess,userUpdateReset} from '../store/user-update'
import axios from 'axios';
import { userLoginSuccess } from '../store/user-slice';

export const updateUserDetails = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateRequest());

        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`, //to update also we nned token
            },
        };
        
        const { data } = await axios.put(`/api/users/profile/update/`, user,config);
    //This line sends a PUT request to the backend endpoint /api/users/profile/update/ with the user object as the request body. The config object includes the necessary headers, including the authorization token.

        dispatch(userUpdateSuccess(data));
        dispatch(userLoginSuccess(data))//after updating logging in with new info
        localStorage.setItem('userInfo',JSON.stringify(data))

    } catch (error) {
        dispatch(userUpdateFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};
