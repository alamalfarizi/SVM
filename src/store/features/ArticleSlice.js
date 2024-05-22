import { createSlice } from '@reduxjs/toolkit';
import { getArticleAll, getArticleById, submitArticle, updateArticle, deleteArticle } from '../actions/ArticleAction';

const initalState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const articleSlice = createSlice({
  name: 'article',
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getArticleAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArticleAll.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.all = payload.data.article);
      state.error = '';
    });
    builder.addCase(getArticleAll.rejected, (state, action) => {
      (state.loading = false), (state.all = []), (state.error = action.error ?? '');
    });
    builder.addCase(getArticleById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getArticleById.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload);
      state.error = action.payload.message ?? '';
    });
    builder.addCase(getArticleById.rejected, (state, action) => {
      (state.loading = false), (state.detail = undefined);
      state.error = action.error.message ?? '';
    });
    builder.addCase(updateArticle.pending, (state) => {
      state.loading = true;
    });
    
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    });
    builder.addCase(submitArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitArticle.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data);
      state.error = '';
    });
    builder.addCase(submitArticle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? '';
    });
    builder.addCase(deleteArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data);
      state.error = '';
    });
    
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.loading = false;
    });
  }
});

export default articleSlice;
