import { orderDetailFailure,orderDetailRequest,orderDetailSuccess } from "../store/order-detail";
import { orderPayRequest,orderPayFail,orderPayReset,orderPaySuccess } from "../store/order-pay";
import { orderDeliveredRequest,orderDeliveredFail,orderDeliveredSuccess } from "../store/order-delivered";
import axios from 'axios';
export const getorderDetails = (id) => async (dispatch, getState) => {
    try {
       dispatch(orderDetailRequest())
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
            `/api/orders/${id}/`,
            config
        )

        dispatch(orderDetailSuccess(data))

        


    } catch (error) {
        dispatch(orderDetailFailure(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
}



export const payOrder = (id,paymentResult) => async (dispatch, getState) => { //here pament result means paid or not paid
    try {
       dispatch(orderPayRequest())
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${id}/pay/`,
            paymentResult,
            config
        )

        dispatch(orderPaySuccess(data))

        


    } catch (error) {
        dispatch(orderPayFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
}



export const deliverOrder = (order) => async (dispatch, getState) => { 
    try {
       dispatch(orderDeliveredRequest())
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/orders/${order._id}/deliver/`,
            {},
            config
        )

        dispatch(orderDeliveredSuccess(data))

        


    } catch (error) {
        dispatch({
            type: orderDeliveredFail,
            payload: error.response && error.response.data.detail 
                ? error.response.data.detail 
                : error.message,
        });
    }
}



