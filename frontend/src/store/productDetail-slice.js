import { createSlice } from "@reduxjs/toolkit";

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: {
            reviews: []
        },
        loading: false,
        error: null
    },
    reducers: {
        productDetailsRequest(state) {
            state.loading = true;
        },
        productDetailsSuccess(state, action) {
            state.loading = false;
            state.product = action.payload;
            state.error = null;
        },
        productDetailsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

// Exporting actions directly from the slice
export const { productDetailsRequest, productDetailsSuccess, productDetailsFail } = productDetailSlice.actions;

// Exporting reducer function
export default productDetailSlice.reducer;
