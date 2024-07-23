import { createSlice } from "@reduxjs/toolkit";

const productReviewCreate = createSlice({
    name: 'productUpdate',
    initialState: {
        loading: false,
        error: null,
        success:false
    },
    reducers: {
        productReviewCreateRequest(state) {
            state.loading = true;
        },
        productReviewCreateSuccess(state, action) {
            state.loading = false;
            state.success = true;
        },
        productReviewCreateFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        productReviewCreateReset(state) {
            return{
                
            }
        }
    }
});

export const { productReviewCreateRequest, productReviewCreateSuccess, productReviewCreateFail, productReviewCreateReset } = productReviewCreate.actions;

export default productReviewCreate.reducer;

