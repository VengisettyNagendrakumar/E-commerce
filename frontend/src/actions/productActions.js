import { productDetailsFail,productDetailsRequest,productDetailsSuccess } from '../store/productDetail-slice';
import { productListFail,productListRequest,productListSuccess } from '../store/product-slice';
import { productDeleteFail,productDeleteRequest,productDeleteSuccess } from '../store/product-delete';
import { createProductRequest,createProductFail,createProductSuccess,createProductReset } from '../store/create-product';
import { productUpdateFail,productUpdateRequest,productUpdateSuccess } from '../store/productUpdate';
import { productReviewCreateFail,productReviewCreateRequest,productReviewCreateSuccess } from '../store/product_CreateReview';
import { topProductListFail,topProductListRequest,topProductListSuccess } from '../store/topProducts';
import axios from 'axios';


export const listProducts = (keyword = '') => async (dispatch) => {  //default keyword is empty
    try {
        dispatch(productListRequest()); 

        const { data } = await axios.get(`/api/products/?keyword=${keyword}`); // here keyword is optional


        dispatch(productListSuccess(data)); 
    } catch (error) {
        dispatch(productListFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};


export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch(productDetailsRequest())
        const { data } = await axios.get(`/api/products/${id}`);

        dispatch(productDetailsSuccess(data));
    } catch (error) {
        dispatch(productDetailsFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};



export const deleteProduct = (id) => async (dispatch,getState) => {


    try {
        dispatch(productDeleteRequest());
        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        
        const { data } = await axios.delete(`/api/products/delete/${id}`,config);

        dispatch(productDeleteSuccess());
    } catch (error) {
        dispatch(productDeleteFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};



export const ProductCreate= () => async (dispatch,getState) => {
    try {
        dispatch(createProductRequest())
        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        

        const { data } = await axios.post(`/api/products/create/`,{},config);

        dispatch(createProductSuccess(data))
    } catch (error) {
        dispatch(createProductFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};





export const productUpdate= (product) => async (dispatch,getState) => {
    try {
        dispatch(productUpdateRequest())
        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        

        const { data } = await axios.put(`/api/products/update/${product._id}/`,product,config);

       dispatch(productUpdateSuccess(data));
        dispatch(productDetailsSuccess(data))
    } catch (error) {
        dispatch(productUpdateFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};






export const createProductReview= (productId,review) => async (dispatch,getState) => {
    try {
        dispatch(productReviewCreateRequest())
        const { userLogin: { userInfo } } = getState(); // Access userInfo from state i.e userLogin state

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        

        const { data } = await axios.post(`/api/products/${productId}/reviews/`,review,config);

       dispatch(productReviewCreateSuccess(data))
    } catch (error) {
        dispatch(productReviewCreateFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};




export const topProducts = () => async (dispatch) => {  
    try {
        dispatch(topProductListRequest()); 

        const { data } = await axios.get(`/api/products/top/`); 


        dispatch(topProductListSuccess(data)); 
    } catch (error) {
        dispatch(topProductListFail(error.response && error.response.data.detail 
            ? error.response.data.detail 
            : error.message,))
    }
};


