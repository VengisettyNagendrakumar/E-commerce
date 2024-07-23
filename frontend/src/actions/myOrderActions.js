import axios from 'axios';
import { myOrderFailure,myOrderSuccess,myOrderRequest} from '../store/myorders';
import { allOrdersRequest,allOrdersSuccess,allOrdersFailure } from '../store/allorders';
export const listMyOrders = () => async (dispatch, getState) => {
    try {
       dispatch(myOrderRequest())
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/myorders/`,
            config
        )

        dispatch(myOrderSuccess(data))

        


    } catch (error) {
        dispatch(myOrderFailure(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
}





export const listallOrders = () => async (dispatch, getState) => {
    try {
       dispatch(allOrdersRequest())
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/orders/`,
            config
        )

        dispatch(allOrdersSuccess(data))

        


    } catch (error) {
        dispatch(allOrdersFailure(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
}



