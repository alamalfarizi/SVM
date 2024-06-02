import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

export const userLogin = createAsyncThunk('auth/register', async (props, { rejectWithValue }) => {
  try {
    const response = await UserService.login(props);
    const result = response.data;
    if (result.error === false) {
      localStorage.setItem('userToken', result.token);
      console.log('userToken set in localStorage:', result.token);
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

