import { createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('token')

const initialState = {
  token: tokenFromStorage || null,
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
  rememberFlag: !!tokenFromStorage,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
    setRememberFlag(state, action) {
      state.rememberFlag = action.payload
    },
    logout(state) {
      state.token = null
      state.status = 'idle'
      state.error = null
      state.rememberFlag = false
      localStorage.removeItem('token')
    },
  },
})

export const { setToken, setStatus, setError, setRememberFlag, logout } =
  authSlice.actions
export default authSlice.reducer
