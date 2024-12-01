import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllSectionsAPI } from '../../services/categoryAPI'; // Ensure the path is correct

// Async thunk to fetch sections
export const fetchAllSections = createAsyncThunk(
  'sections/fetchAllSections',
  async (_, thunkAPI) => {
    try {
      const data = await fetchAllSectionsAPI(); // Await the API call
      return data; // Return the resolved data
    } catch (error) {
      console.error('Error in fetchAllSections thunk:', error);
      // Use thunkAPI.rejectWithValue to handle custom errors
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch sections'
      );
    }
  }
);

const serviceSectionsSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [], // Initialize as an empty array
    status: 'idle', // Possible values: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // For storing error messages
  },
  reducers: {
    setSections: (state, action) => {
      state.sections = action.payload; // Manually set sections
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sections = action.payload; // Update sections with the API response
      })
      .addCase(fetchAllSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSections } = serviceSectionsSlice.actions; // Export the setSections action
export default serviceSectionsSlice.reducer;
 