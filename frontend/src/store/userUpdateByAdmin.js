import { createSlice } from "@reduxjs/toolkit";

const userUpdateByAdminSlice = createSlice({
    name: 'update-details',
    initialState: {
        loading: false,
        error: null,
        user: {},
        success:false,
    },
    reducers: {
        userUpdateByAdminRequest(state) {
            state.loading = true;

        },
        userUpdateByAdminSuccess(state, action) {
            state.loading = false;
            state.success = true    
        },
        userUpdateByAdminFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateByAdminReset(state, action) {
            return {
                loading: false,
                error: null,
                user: {},
                success: false,
            }
        }
    }
});

export const { userUpdateByAdminRequest, userUpdateByAdminSuccess, userUpdateByAdminFail, userUpdateByAdminReset } = userUpdateByAdminSlice.actions;

export default userUpdateByAdminSlice.reducer;
