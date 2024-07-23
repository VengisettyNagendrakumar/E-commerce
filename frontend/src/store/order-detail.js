import { createSlice } from "@reduxjs/toolkit";

const orderDetail=createSlice({
    name: 'orderDetail',
    initialState: {
        loading: true,
        orderItems: [],
        shippingAddress:{},
        error: null
    },
    reducers: {
        orderDetailRequest(state){
           state.loading = true;
        },
        orderDetailSuccess(state, action){
            return{
                loading:false,
                order:action.payload
            }
        },
        orderDetailFailure(state,action){
            state.loading = false;
            state.error=action.payload;
        },
    
    }
})

export const { orderDetailRequest, orderDetailSuccess, orderDetailFailure } = orderDetail.actions;

export default orderDetail.reducer;