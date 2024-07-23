import { configureStore } from '@reduxjs/toolkit';
import productSlice from './product-slice';
import productDetailSlice from './productDetail-slice';
import cartSlice from './cart-slice';
import userLoginSlice from './user-slice'
import userRegisterSlice from './register-slice'
import userDetailSlice from './user-details'
import userUpdateSlice from './user-update';
import userUpdate from './user-update';
import orderSlice from './order-slice';
import orderDetailSlice from './order-detail';
import orderPay from './order-pay';
import myOrderSlice from './myorders'
import userListSlice from './userList';
import userDeleteSlice from './user-delete';
import userUpdateByAdminSlice from './userUpdateByAdmin';
import productDeleteSlice from './product-delete';
import createProductSlice from './create-product';
import productUpdateSlice from './productUpdate';
import allordersSlice from './allorders';
import orderDeliveredSlice from './order-delivered';
import product_CreateReviewSlice from './product_CreateReview';
import topProductsSlice from './topProducts';


const cartItemsFromStorage =localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')):[];

const userInfoFromStorage =localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')):null;

const shippingInfoFromStorage =localStorage.getItem('shippingAddress')?
    JSON.parse(localStorage.getItem('shippingAddress')):null;
    
const paymentInfoFromStorage =localStorage.getItem('paymentMethod')?
    JSON.parse(localStorage.getItem('paymentMethod')):null;
    
const initialState={
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingInfoFromStorage,
        paymentMethod: paymentInfoFromStorage,
        
    },
    userLogin:{
        userInfo:userInfoFromStorage
    }
}
const store = configureStore({
    reducer: {
       product:productSlice,
       productDetail:productDetailSlice,
       cart:cartSlice,
       userLogin:userLoginSlice,
       userRegister:userRegisterSlice,
       userDetails:userDetailSlice,
       userUpdate:userUpdateSlice,
       orderCreate: orderSlice,
       orderDetails: orderDetailSlice,
       orderPay: orderPay,
       myOrders: myOrderSlice,
       userList: userListSlice,
       userDelete: userDeleteSlice,
       userUpdateByAdmin: userUpdateByAdminSlice,
       productDelete: productDeleteSlice,
       createProduct: createProductSlice,
       productUpdate: productUpdateSlice,
       allOrders: allordersSlice,
       orderDelivered: orderDeliveredSlice,
       productCreateReview: product_CreateReviewSlice,
       topRatedProducts: topProductsSlice,

       

    },
    preloadedState: initialState // Ensure initial state is used

});


export default store;
