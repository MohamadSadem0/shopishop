// src/redux/serviceSectionsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchServiceCategories } from '../services/authService';

// Async thunk to fetch sections
export const fetchSections = createAsyncThunk('serviceSections/fetchSections', async () => {
  const response = await fetchServiceCategories();
  return response;
});

const serviceSectionsSlice = createSlice({
  name: 'serviceSections',
  initialState: {
    sections: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default serviceSectionsSlice.reducer;
