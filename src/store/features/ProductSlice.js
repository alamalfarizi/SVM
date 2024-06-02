import { createSlice } from '@reduxjs/toolkit';
import { getProductAll, getProductById, submitProduct, updateProduct, deleteProduct } from '../actions/ProductAction';

const initialState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductAll.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.all = payload.data.product);
      state.error = '';
    });
    builder.addCase(getProductAll.rejected, (state, action) => {
      (state.loading = false), (state.all = []);
      state.error = action.payload.message;
    });

    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.detail = payload.data.product);
      state.error = '';
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      (state.loading = false), (state.detail = {});
      state.error = action.payload.message;
    });
    builder.addCase(submitProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitProduct.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.detail = payload.data.product);
      state.error = '';
    });
    builder.addCase(submitProduct.rejected, (state, action) => {
      (state.loading = false), (state.detail = {});
      state.error = action.payload.message;
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }
});

export default productSlice;
