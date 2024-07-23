import { createSlice } from "@reduxjs/toolkit";

const userLoginSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        userInfo: null,
        error: null
    },
    reducers: {
        userLoginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        userLoginSuccess(state, action) {
            state.loading = false;
            state.userInfo = action.payload;
            state.error = null;
        },
        userLoginFail(state, action) {
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

export const { userLoginRequest, userLoginSuccess, userLoginFail, userLogout } = userLoginSlice.actions;
export default userLoginSlice.reducer;
