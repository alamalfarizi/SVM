import { createAsyncThunk } from '@reduxjs/toolkit';
import PengaduanService from '../../services/PengaduanService';

export const getPengaduanAll = createAsyncThunk('pengaduan/all', async (payload, { rejectWithValue }) => {
  try {
    const response = await PengaduanService.getAll();
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getPengaduanById = createAsyncThunk('pengaduan/getDataById', async (id, { rejectWithValue }) => {
  try {
    const response = await PengaduanService.getById(id);
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

export const updatePengaduan = createAsyncThunk('pengaduan/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await PengaduanService.put(id, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const submitPengaduan = createAsyncThunk('pengaduan/created', async (formData, { rejectWithValue }) => {
  try {
    const response = await PengaduanService.post(formData);
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

export const deletePengaduan = createAsyncThunk('pengaduan/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await PengaduanService.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
