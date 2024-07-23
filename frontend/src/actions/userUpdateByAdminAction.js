import axios from 'axios';
import { userUpdateByAdminFail,userUpdateByAdminRequest,userUpdateByAdminSuccess } from '../store/userUpdateByAdmin';
import { userDetailSuccess } from '../store/user-details';
export const updateUserByAdmin = (user) => async (dispatch, getState) => {
    try {
        dispatch(userUpdateByAdminRequest());

        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.put(`/api/users/updateuser/${user._id}/`,
            user,
             config);

         dispatch(userUpdateByAdminSuccess());

         dispatch(userDetailSuccess(data)); // Update user details with the updated user data
    } catch (error) {
        dispatch(userUpdateByAdminFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};
