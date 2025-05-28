// redux/scholarSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchScholarData = createAsyncThunk(
  'scholar/fetchScholarData',
  async (url) => {
    const res = await axios.post('/api/scholar-profile', { url });
    return res.data;
  }
);

const scholarSlice = createSlice({
  name: 'scholar',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScholarData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchScholarData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchScholarData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default scholarSlice.reducer;
