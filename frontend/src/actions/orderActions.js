import axios from 'axios'
import { orderCreateFailure,orderCreateSuccess,orderCreateRequest } from '../store/order-slice'
import { cartReset } from '../store/cart-slice'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
       dispatch(orderCreateRequest())
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/orders/add/`,
            order,
            config
        )

        dispatch(orderCreateSuccess(data))
        dispatch(cartReset())//after order success we need to reset cart also

       localStorage.removeItem('cartItems')
        


    } catch (error) {
        dispatch(orderCreateFailure(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
}


