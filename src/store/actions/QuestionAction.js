import { createAsyncThunk } from '@reduxjs/toolkit';
import QuestionService from '../../services/QuestionService';

export const getQuestionAll = createAsyncThunk('question/all', async (payload, { rejectWithValue }) => {
  try {
    const response = await QuestionService.getAll();
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

export const getQuestionById = createAsyncThunk('question/getDataById', async (id, { rejectWithValue }) => {
  try {
    const response = await QuestionService.getById(id);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const updateQuestion = createAsyncThunk('question/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await QuestionService.put(id, formData);
    console.log(formData);
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

export const submitQuestion = createAsyncThunk('question/created', async (formData, { rejectWithValue }) => {
  try {
    const response = await QuestionService.post(formData);
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

export const deleteQuestion = createAsyncThunk('question/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await QuestionService.remove(id);
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
