import { createSlice } from "@reduxjs/toolkit";
const myOrders=createSlice({
    name: "myOrders",
    initialState: {
        orders:[],
        error: null,
        loading: false
    },
    reducers: {
         myOrderRequest(state){
             state.loading=true
         },
         myOrderSuccess(state,action){
             state.loading=false
             state.orders=action.payload
         },
         myOrderFailure(state,action){
             state.loading=false
             state.error=action.payload
         },
         clearMyOrders(state){
             state.orders=[]
             state.error=null
             state.loading=false
         }

}
})

export const {myOrderRequest,myOrderSuccess,myOrderFailure,clearMyOrders}=myOrders.actions

export default myOrders.reducer;