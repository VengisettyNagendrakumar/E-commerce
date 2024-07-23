import axios from 'axios';
import { userDeleteFail,userDeleteRequest,userDeleteSuccess } from '../store/user-delete';
export const userDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDeleteRequest());

        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.delete(`/api/users/deleteuser/${id}/`, config);

         dispatch(userDeleteSuccess());
    } catch (error) {
        dispatch(userDeleteFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    }
};
