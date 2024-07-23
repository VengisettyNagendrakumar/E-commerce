import { createSlice } from "@reduxjs/toolkit";
const orderPay=createSlice({
    name: "orderPay",
    initialState: {
        loading: false,
        error: null,
        success:false
    },
    reducers: {
        orderPayRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        orderPaySuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        orderPayFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderPayReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    }
})

export const { orderPayRequest, orderPaySuccess, orderPayFail, orderPayReset } = orderPay.actions;

export default orderPay.reducer;