import { createSlice } from "@reduxjs/toolkit";

const userRegisterSlice = createSlice({
    name: 'register',
    initialState: {
        loading: false,
        userInfo: null,
        error: null
    },
    reducers: {
        userRegisterRequest(state) {
            state.loading = true;
            state.error = null;
        },
        userRegisterSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
        },
        userRegisterFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        userLogout(state) {
            state.loading = false;
            state.userInfo = null;
            state.error = null;
        }
    }
});
export const {userRegisterRequest,userRegisterFail,userRegisterSuccess,userLogout}=userRegisterSlice.actions;
export default userRegisterSlice.reducer