import { createSlice } from '@reduxjs/toolkit';
import { getQuestionAll, getQuestionById, updateQuestion, submitQuestion, deleteQuestion } from '../actions/QuestionAction';

const initalState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const questionSlice = createSlice({
  name: 'question',
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuestionAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQuestionAll.fulfilled, (state, { payload }) => {
      (state.loading = false), (state.all = payload.data.question);
      state.error = '';
    });
    builder.addCase(getQuestionAll.rejected, (state, action) => {
      (state.loading = false), (state.all = []), (state.error = action.error ?? '');
    });
    builder.addCase(getQuestionById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.question);
      state.error = action.payload.message ?? '';
    });
    builder.addCase(getQuestionById.rejected, (state, action) => {
      (state.loading = false), (state.detail = undefined);
      state.error = action.payload.message ?? '';
    });
    builder.addCase(updateQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateQuestion.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });
    builder.addCase(submitQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitQuestion.fulfilled, (state, action) => {
      (state.loading = false), (state.detail = action.payload.data.question);
      state.error = '';
    });
    builder.addCase(submitQuestion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });
    builder.addCase(deleteQuestion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteQuestion.rejected, (state) => {
      state.loading = false;
    });
  }
});

export default questionSlice;
