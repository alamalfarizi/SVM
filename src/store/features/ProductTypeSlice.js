import { createSlice } from '@reduxjs/toolkit';
import { productTypeGetAll, productTypeGetId, submitProductType, updateProductType } from '../actions/ProductTypeAction';

const initialState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const productTypeSlice = createSlice({
  name: 'productType',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(productTypeGetAll.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(productTypeGetAll.fulfilled, (state, action) => {
      state.loading = false;
      state.all = action.payload.data.product;
      state.error = '';
    });
    builder.addCase(productTypeGetAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(productTypeGetId.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(productTypeGetId.fulfilled, (state, action) => {
      state.loading = false;
      state.detail = action.payload.data.product;
      state.error = '';
    });
    builder.addCase(productTypeGetId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(submitProductType.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(submitProductType.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(submitProductType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateProductType.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(updateProductType.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateProductType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  }
});

export default productTypeSlice;
