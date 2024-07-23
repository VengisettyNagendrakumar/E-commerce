// import {userDetailRequest,userDetailFail,userDetailSuccess} from '../store/user-details'
// import axios from 'axios';
// import {useSelector} from 'react-redux'

// export const getUserDetails=(id)=>async(dispatch) => {
//    try{
//         dispatch({
//             type:userDetailRequest,
//         })
        
//         const user=useSelector(state=>state.userLogin)
//         const {userInfo}=user; //to access user Details we need token it is present when we logged in
//         const {config}={
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }
//         const {data}=await axios.get(`/api/users/${id}/`,
//             config
//         )  
//         dispatch({
//             type:userDetailSuccess,
//             payload: data,
//         }) 
       
//    }
//    catch(error){
//     dispatch({
//         type:userDetailFail,
//         payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//     })
//    }
// }

import { userDetailRequest, userDetailSuccess, userDetailFail } from '../store/user-details';
import axios from 'axios';

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch(userDetailRequest());

        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.get(`/api/users/${id}/`, config);

        dispatch(userDetailSuccess(data));
    } catch (error) {
        dispatch(userDetailFail(
            error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        ));
    }
};
