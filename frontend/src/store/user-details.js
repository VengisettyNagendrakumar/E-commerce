import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
    name: 'details',
    initialState: {
        loading: false,
        user:{},
        error: null
    },
    reducers: {
        userDetailRequest(state) {
            state.loading = true;
            state.error = null;
            state.user={};

        },
        userDetailSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        },
        userDetailFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userDetailReset(state) {
           state.user={};
        }
        
    }
});
export const {userDetailRequest,userDetailFail,userDetailSuccess,userDetailReset}=userDetailSlice.actions;
export default userDetailSlice.reducer