import { createSlice } from '@reduxjs/toolkit';
import {
  getPengaduanAll,
  getPengaduanById,
  submitPengaduan,
  updatePengaduan,
  deletePengaduan,
  submitTicket
} from '../actions/PengaduanAction';

const initalState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const pengaduanSlice = createSlice({
  name: 'pengaduan',
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPengaduanAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPengaduanAll.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.all = payload.data.report);
      state.error = '';
    });
    builder.addCase(getPengaduanAll.rejected, (state, action) => {
      (state.loading = false), (state.all = []), (state.error = action.error.message ?? '');
    });
    builder.addCase(getPengaduanById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPengaduanById.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data.report);
      state.error = action.payload.message ?? '';
    });
    builder.addCase(getPengaduanById.rejected, (state, action) => {
      (state.loading = false), (state.detail = undefined);
      state.error = action.payload.message ?? '';
    });
    builder.addCase(updatePengaduan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePengaduan.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updatePengaduan.rejected, (state) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    });
    builder.addCase(submitPengaduan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitPengaduan.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data.report);
      state.error = '';
    });
    builder.addCase(submitPengaduan.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    });
    builder.addCase(deletePengaduan.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePengaduan.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data.report);
      state.error = '';
    });
    builder.addCase(deletePengaduan.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(submitTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitTicket.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(submitTicket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    })
  }
});

export default pengaduanSlice;
