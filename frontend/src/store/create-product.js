import { createSlice } from "@reduxjs/toolkit";

const createProductSlice = createSlice({
    name: 'createproduct',
    initialState: {
        loading: false,
        error: null,
        product:[],
        success: false,
    },
    reducers: {
        createProductRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createProductSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.product = action.payload;
            state.success = true;
        },
        createProductFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createProductReset(state) {
            return {
                loading: false,
                error: null,
                product: [],
                success: false,
            };
        }
    }
});

export const { createProductRequest, createProductSuccess, createProductFail, createProductReset } = createProductSlice.actions;

export default createProductSlice.reducer;
