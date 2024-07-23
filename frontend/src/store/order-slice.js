import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name: 'order',
    initialState: {
        loading:false,
        order: null,
        success:false,
        error: null
    },
    reducers: {
        orderCreateRequest(state){
             state.loading= true;
        },
        orderCreateSuccess(state, action){
            state.loading= false;
            state.success= true;
            state.order=action.payload
        },
        orderCreateFailure(state,action){
            state.loading= false;
            state.error= action.payload;
        }, //after order success we need to make it reset
        orderCreateReset(state){
            state.loading= false;
            state.success= false;
            state.error= null;
            state.order= null;
        }
    }
}

)

export const { orderCreateRequest, orderCreateSuccess, orderCreateFailure,orderCreateReset } = orderSlice.actions;

export default orderSlice.reducer;