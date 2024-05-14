import { createAsyncThunk } from '@reduxjs/toolkit';
import AnswerService from '../../services/AnswerServices';



export const submitAnswer = createAsyncThunk('answer/created', async (formData, { rejectWithValue }) => {
    try {
      console.log(formData)
      const response = await AnswerService.post(formData);
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
  
  export const updateAnswer = createAsyncThunk('answer/update', async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await AnswerService.put(id, formData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  });
  
  export const deleteAnswer = createAsyncThunk('answer/delete', async (id, { rejectWithValue }) => {
    try {
      const response = await AnswerService.remove(id);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  });
