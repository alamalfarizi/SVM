import { createSlice } from '@reduxjs/toolkit';
import { submitAnswer, updateAnswer, deleteAnswer } from '../actions/AnswerAction';

const initialState = {
  loading: false,
  all: [],
  detail: {},
  error: ''
};

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitAnswer.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(submitAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(updateAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAnswer.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateAnswer.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message ?? '';
    });

    builder.addCase(deleteAnswer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteAnswer.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteAnswer.rejected, (state, action) => {
      state.loading = false;
    });
  }
});
