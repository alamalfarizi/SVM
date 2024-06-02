import { createAsyncThunk } from '@reduxjs/toolkit';
import TransactionService from '../../services/TransactionServices';

export const getTransactionAll = createAsyncThunk('transaction/all', async (props, { rejectWithValue }) => {
  try {
    const response = await TransactionService.get();
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getTransactionById = createAsyncThunk('transaction/getId', async (id, { rejectWithValue }) => {
  try {
    const response = await TransactionService.getById(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const submitTransaction = createAsyncThunk('transaction/submit', async (data, { rejectWithValue }) => {
  try {
    const response = await TransactionService.post(data);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
