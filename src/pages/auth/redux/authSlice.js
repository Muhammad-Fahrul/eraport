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
      localStorage.removeItem('login');
      state.isLogin = false;
    },
    setLogin: () => {
      localStorage.setItem('login', JSON.stringify(true));
    },
  },
});

export const { setCredentials, rmCredentials, setLogin } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectIsLogin = (state) => state.auth.isLogin;
