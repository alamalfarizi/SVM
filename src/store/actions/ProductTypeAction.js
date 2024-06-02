import { createAsyncThunk } from '@reduxjs/toolkit';
import ProductTypeService from '../../services/ProductTypeService';

export const productTypeGetAll = createAsyncThunk('productType/get', async (props, { rejectWithValue }) => {
  try {
    const response = await ProductTypeService.get();
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const productTypeGetId = createAsyncThunk('productType/getId', async (id, { rejectWithValue }) => {
  try {
    const response = await ProductTypeService.getId(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const submitProductType = createAsyncThunk('productType/submit', async (data, { rejectWithValue }) => {
  try {
    const response = await ProductTypeService.post(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateProductType = createAsyncThunk('productType/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await ProductTypeService.patch(id, data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteProductType = createAsyncThunk('productType/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await ProductTypeService.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
