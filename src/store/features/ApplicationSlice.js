import { createSlice } from '@reduxjs/toolkit';
import { deleteApplication, getApplication, getApplicationById, submitApplication, updateApplication } from '../actions/ApplicationAction';

const initalState = {
  loading: false,
  detail: {},
  error: '',
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState: initalState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApplication.fulfilled, (state, action) => {
      state.loading = false, 
      state.detail = action.payload.data;
      state.error = '';
    });
    builder.addCase(getApplication.rejected, (state, action) => {
      state.loading = false, 
      state.applications = {}, 
      state.error = action.error.message ?? '';
    });

    builder.addCase(getApplicationById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getApplicationById.fulfilled, (state, action) => {
      state.loading = false, 
      state.detail = action.payload;
      state.error = '';
    });
    builder.addCase(getApplicationById.rejected, (state, action) => {
      state.loading = false, 
      state.detail = undefined;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(submitApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitApplication.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(submitApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(updateApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateApplication.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(deleteApplication.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteApplication.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });

   builder.addCase(deleteApplication.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default applicationSlice;
