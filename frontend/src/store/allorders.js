import { createSlice } from "@reduxjs/toolkit";
const allOrders=createSlice({
    name: "allOrders",
    initialState: {
        orders:[],
        error: null,
        loading: false
    },
    reducers: {
         allOrdersRequest(state){
             state.loading=true
         },
         allOrdersSuccess(state,action){
             state.loading=false
             state.orders=action.payload
         },
         allOrdersFailure(state,action){
             state.loading=false
             state.error=action.payload
         },
         

}
})

export const {allOrdersRequest,allOrdersSuccess,allOrdersFailure}=allOrders.actions

export default allOrders.reducer;


