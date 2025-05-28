// redux/resumeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchResumeData = createAsyncThunk(
  'resume/fetchResumeData',
  async (file) => {
    const formData = new FormData();
    formData.append('resume', file);

    const res = await axios.post('/api/parse-resume', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return res.data;
  }
);

const resumeSlice = createSlice({
  name: 'resume',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResumeData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchResumeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default resumeSlice.reducer;
