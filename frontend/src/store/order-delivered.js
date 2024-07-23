import { createSlice } from "@reduxjs/toolkit";
const orderDelivered=createSlice({
    name: "orderPay",
    initialState: {
        loading: false,
        error: null,
        success:false
    },
    reducers: {
        orderDeliveredRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        orderDeliveredSuccess: (state) => {
            state.loading = false;
            state.success = true;
        },
        orderDeliveredFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderDeliveredReset: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    }
})

export const { orderDeliveredRequest, orderDeliveredSuccess, orderDeliveredFail, orderDeliveredReset } = orderDelivered.actions;

export default orderDelivered.reducer;

