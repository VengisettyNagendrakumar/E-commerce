import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice(
    {
        name:'cart',
        initialState:{
            cartItems:[],
            shippingAddress:{},
            paymentMethod:''
        },
        reducers:{
            addItemtoCart(state,action){
                const item=action.payload
                const existItem=state.cartItems.find(x=>x.product===item.product)
                if (existItem){
                    return{
                        ...state,
                        cartItems:state.cartItems.map(x=>x.product===existItem.product?item:x)
                    }
                }
                else{
                   return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                   }
                }
            },
            removeItemfromCart(state,action){
                return{
                   ...state,
                    cartItems:state.cartItems.filter(x=> x.product !==action.payload)
                }
            },
            savingShippingAddress(state,action){
                return{
                   ...state,
                    shippingAddress:action.payload
                }
            },
            savingPaymentMethod(state,action){
                return{
                   ...state,
                    paymentMethod:action.payload
                }
            },
            cartReset(state){
                return{
                   ...state,
                    cartItems:[],
                    
                }
            }
        }
    }
)
export const {addItemtoCart,removeItemfromCart,savingShippingAddress, savingPaymentMethod,cartReset}=cartSlice.actions;
export default cartSlice.reducer;
