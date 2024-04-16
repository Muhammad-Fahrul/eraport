import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isLogin: localStorage.getItem('login') || false,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    rmCredentials: (state) => {
      state.token = null;
    },
  },
});

export const { setCredentials, rmCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;
