import { createSlice } from "@reduxjs/toolkit";

const productUpdateSlice = createSlice({
    name: 'productUpdate',
    initialState: {
        product:{},
        loading: false,
        error: null,
        success:false
    },
    reducers: {
        productUpdateRequest(state) {
            state.loading = true;
        },
        productUpdateSuccess(state, action) {
            state.loading = false;
            state.product = action.payload;
            state.success = true;
        },
        productUpdateFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        productUpdateReset(state) {
            return{
                product: {},
                
            }
        }
    }
});

export const { productUpdateRequest, productUpdateSuccess, productUpdateFail,productUpdateReset } = productUpdateSlice.actions;

export default productUpdateSlice.reducer;

