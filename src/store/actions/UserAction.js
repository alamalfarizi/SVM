import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from '../../services/UserService';

export const userLogin = createAsyncThunk('auth/register', async (props, { rejectWithValue }) => {
  try {
    const response = await UserService.login(props);
    const result = response.data;
    console.log(result);
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


// ===========================================|| BATAS ||=======================================================//

export const getUserAll = createAsyncThunk('user/all', async (payload, { rejectWithValue }) => {
  try {
    const response = await UserService.getAll();
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUser = createAsyncThunk('user/getData', async ({ meta, search, filters }, { rejectWithValue }) => {
  try {
    const response = await UserService.get(meta, search, filters);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const getUserById = createAsyncThunk('user/getDataById', async (id, { rejectWithValue }) => {
  try {
    const response = await UserService.getById(id);
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

export const updateUser = createAsyncThunk('user/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await UserService.put(id, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const changeStatusUser = createAsyncThunk('user/changeStatusUser', async (id, { rejectWithValue }) => {
  console.log(id);
  try {
    const response = await UserService.changeStatus(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const resetUser = createAsyncThunk('user/resetUser', async (id, { rejectWithValue }) => {
  try {
    const response = await UserService.reset(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const changePasswordUser = createAsyncThunk('user/changePasswordUser', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await UserService.changePassword(id, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await UserService.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
