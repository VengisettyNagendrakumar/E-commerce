


import axios from 'axios';
import {
    addItemtoCart,
    removeItemfromCart,
    savingShippingAddress,
    savingPaymentMethod,
} from '../store/cart-slice';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch(addItemtoCart({
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty: qty,
    }));

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
    //     //when we store in lcalstorafe even we refresh page data will not be deleted

};

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch(removeItemfromCart(id));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch(savingShippingAddress(data));
    localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch(savingPaymentMethod(data));
    localStorage.setItem('paymentMethod', JSON.stringify(data));
};
