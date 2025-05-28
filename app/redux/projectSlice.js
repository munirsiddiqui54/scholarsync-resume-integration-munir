// redux/projectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProjectSuggestions = createAsyncThunk(
  'projects/fetchProjectSuggestions',
  async (_, { getState }) => {
    const { resume, scholar } = getState();

    const res = await axios.post('/api/project-suggestions', {
      resume: resume.data,
      scholar: scholar.data,
    });

    return res.data;
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    suggestions: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchProjectSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
