import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,

    },
    reducers: {
        productListRequest(state) {
            state.loading = true;
            state.products = [];
            state.error = null;
        },
        productListSuccess(state, action) {
            state.loading = false;
            state.products = action.payload
            state.error = null;
        },
        productListFail(state, action) {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        }
    }
});

// Exporting actions directly from the slice
export const {
    productListRequest,
    productListSuccess,
    productListFail
} = productSlice.actions;

// Exporting reducer function
export default productSlice.reducer;

