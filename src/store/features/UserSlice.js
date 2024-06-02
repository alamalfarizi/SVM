import { createSlice } from '@reduxjs/toolkit';
import { userLogin } from '../actions/UserAction';

const initalState = {
  loading: false,
  auth: undefined,
  users: {},
  all: [],
  detail: {},
  error: '',
  count: ''
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initalState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken');
      state.loading = false;
      state.auth = {
        name: null,
        auth: null
      };
      state.error = '';
    }
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.auth = action.payload?.token ?? '';
      state.users = action.payload?.data?.user ?? [];
      state.error = '';
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });
  }
});

export const { logout } = userSlice.actions;
export default userSlice;
