import { createAsyncThunk } from '@reduxjs/toolkit';
import productServices from '../../services/ProductServices';

export const getProductAll = createAsyncThunk('product/all', async (payload, { rejectWithValue }) => {
  try {
    const response = await productServices.get();
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getProductById = createAsyncThunk('product/getId', async (id, { rejectWithValue }) => {
  try {
    const response = await productServices.getById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const submitProduct = createAsyncThunk('product/submit', async (data, { rejectWithValue }) => {
  try {
    const response = await productServices.post(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateProduct = createAsyncThunk('product/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await productServices.patch(id, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteProduct = createAsyncThunk('product/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await productServices.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
