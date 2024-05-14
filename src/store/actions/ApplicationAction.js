import { createAsyncThunk } from '@reduxjs/toolkit';
import ApplicationService from '../../services/ApplicationService';

export const getApplication = createAsyncThunk('application/getData', async (rejectWithValue) => {
  try {
    const response = await ApplicationService.get();
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getApplicationById = createAsyncThunk('application/getDataById', async (id, { rejectWithValue }) => {
  try {
    const response = await ApplicationService.getById(id);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const submitApplication = createAsyncThunk('application/created', async (formData, { rejectWithValue }) => {
  try {
    const response = await ApplicationService.post(formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateApplication = createAsyncThunk('application/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await ApplicationService.put(id, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteApplication = createAsyncThunk('application/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await ApplicationService.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
