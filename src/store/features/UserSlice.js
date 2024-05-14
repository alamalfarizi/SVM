import { createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUser, getUserAll, getUserById, updateUser, userLogin } from '../actions/UserAction';

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

    builder.addCase(getUserAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserAll.fulfilled, (state, action) => {
      (state.loading = false), (state.all = action.payload.data.rows);
      state.error = '';
    });
    builder.addCase(getUserAll.rejected, (state, action) => {
      (state.loading = false), (state.all = []), (state.error = action.error.message ?? '');
    });

    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      (state.loading = false), (state.count = action.payload.data.count);
      state.users = action.payload.data.rows;
      state.error = '';
    });
    builder.addCase(getUser.rejected, (state, action) => {
      (state.loading = false), (state.users = []), (state.error = action.error.message ?? '');
    });

    builder.addCase(getUserById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload);
      state.auth = action.payload?.accessToken ?? '';
      state.error = '';
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      (state.loading = false), (state.detail = undefined);
      state.error = action.payload.message ?? '';
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export const { logout } = userSlice.actions;
export default userSlice;
