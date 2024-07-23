import axios from 'axios';
import { userListFail,userListRequest,userListSuccess,userListReset } from '../store/userList';
export const userListDetails = () => async (dispatch, getState) => {
    try {
        dispatch(userListRequest());

        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.get(`/api/users/`, config);

        dispatch(userListSuccess(data));
    } catch (error) {
        dispatch(userListFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    }
};


