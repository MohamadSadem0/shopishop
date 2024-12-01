import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllCategoriesAPI } from '../../services/fetchingService';

// Async thunk to fetch categories
export const fetchAllCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    return await fetchAllCategoriesAPI();
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'pending' | 'success' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'success';
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export default categorySlice.reducer;
