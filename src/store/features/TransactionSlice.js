import { createSlice } from '@reduxjs/toolkit';
import { getTransactionAll, submitTransaction, getTransactionById } from '../actions/TransactionAction';

const initialState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTransactionAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionAll.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.all = payload.data.transaction;
        state.error = '';
      })
      .addCase(getTransactionAll.rejected, (state, action) => {
        state.loading = false;
        state.all = [];
        state.error = action.payload.message;
      })
      .addCase(getTransactionById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTransactionById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.detail = payload.data.transaction;
        state.error = '';
      })
      .addCase(getTransactionById.rejected, (state, action) => {
        state.loading = false;
        state.detail = {};
        state.error = action.payload.message;
      })
      .addCase(submitTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitTransaction.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(submitTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  }
});

export default transactionSlice;
