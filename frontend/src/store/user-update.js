import { createSlice } from "@reduxjs/toolkit";

const userUpdateSlice = createSlice({
    name: 'update-details',
    initialState: {
        loading: false,
        error: null,
        userInfo: null,
        success:false,
    },
    reducers: {
        userUpdateRequest(state) {
            state.loading = true;

        },
        userUpdateSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload;
            state.success = true    
        },
        userUpdateFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userUpdateReset(state, action) {
            return {}
        }
    }
});
export const {userUpdateRequest,userUpdateFail,userUpdateSuccess,userUpdateReset}=userUpdateSlice.actions;
export default userUpdateSlice.reducer