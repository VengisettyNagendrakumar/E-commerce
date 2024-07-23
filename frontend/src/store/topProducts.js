import { createSlice } from "@reduxjs/toolkit";

const topProductS = createSlice({
    name: 'product',
    initialState: {
        products: [],
        loading: false,
        error: null,

    },
    reducers: {
        topProductListRequest(state) {
            state.loading = true;
            state.products = [];
            state.error = null;
        },
        topProductListSuccess(state, action) {
            state.loading = false;
            state.products = action.payload
            state.error = null;
        },
        topProductListFail(state, action) {
            state.loading = false;
            state.products = [];
            state.error = action.payload;
        }
    }
});

export const { topProductListRequest, topProductListSuccess, topProductListFail } = topProductS.actions;

export default topProductS.reducer;

