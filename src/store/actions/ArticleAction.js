import { createAsyncThunk } from '@reduxjs/toolkit';
import ArticleService from '../../services/ArticleService';

export const getArticleAll = createAsyncThunk('article/all', async (payload, { rejectWithValue }) => {
  try {
    const response = await ArticleService.get();
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

export const getArticleById = createAsyncThunk('article/getDataById', async (id, { rejectWithValue }) => {
  try {
    const response = await ArticleService.getById(id);
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

export const updateArticle = createAsyncThunk('article/update', async ({ id, formData }, { rejectWithValue }) => {
  try {
    const response = await ArticleService.put(id, formData);
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

export const submitArticle = createAsyncThunk('article/created', async (formData, { rejectWithValue }) => {
  try {
    const response = await ArticleService.post(formData);
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

export const deleteArticle = createAsyncThunk('article/delete', async (id, { rejectWithValue }) => {
  try {
    const response = await ArticleService.remove(id);
    return response.data;
  } catch (error) {
    if (error.response) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
