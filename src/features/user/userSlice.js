import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    firstName: null,
    lastName: null,
    userName: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail(state, action) {
            state.email = action.payload;
        },
        setFirstName(state, action) {
            state.firstName = action.payload;
        },
        setLastName(state, action) {
            state.lastName = action.payload;
        },
        setUserName(state, action) {
            state.userName = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        resetUser() {
            return initialState;
        },
    },
});

export const {
    setEmail,
    setFirstName,
    setLastName,
    setUserName,
    setStatus,
    setError,
    resetUser,
} = userSlice.actions;
export default userSlice.reducer;
