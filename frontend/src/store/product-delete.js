import { createSlice } from "@reduxjs/toolkit";

const productDeleteSlice = createSlice({
    name: 'product',
    initialState: {
        loading: false,
        error: null,
        success:false,
    },
    reducers: {
        productDeleteRequest(state) {
            state.loading = true;
        },
        productDeleteSuccess(state, action) {
            state.loading = false;
            state.success = true;
        },
        productDeleteFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { productDeleteRequest, productDeleteSuccess, productDeleteFail } = productDeleteSlice.actions;

export default productDeleteSlice.reducer;

