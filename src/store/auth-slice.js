import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    isAuthenticated: localStorage.getItem("flagToken") ? true : false,
    userEmail: localStorage.getItem("flagToken") ? (JSON.parse(localStorage.getItem("flagToken"))).email : null
};

const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.userEmail = action.payload;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.userEmail = null;
        }
    }
});

export const authActions = authSlice.actions;
export const userInfo = (state) => state.auth;

export default authSlice.reducer;