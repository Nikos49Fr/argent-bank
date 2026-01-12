import { createSlice } from '@reduxjs/toolkit';

const tokenFromStorage = sessionStorage.getItem('token');

const initialState = {
    token: tokenFromStorage || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
        },
        logout(state) {
            state.token = null;
            sessionStorage.removeItem('token');
        },
    },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
