import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllSectionsAPI } from "../../services/fetchingService";

// Async thunk to fetch sections
export const fetchAllSections = createAsyncThunk(
  'sections/fetchAllSections',
  async (_, thunkAPI) => {
    try {
      const data = await fetchAllSectionsAPI();
      return data;
    } catch (error) {
      console.error('Error in fetchAllSections thunk:', error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch sections'
      );
    }
  }
);

const sectionSlice = createSlice({
  name: 'sections',
  initialState: {
    sections: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addSection: (state, action) => {
      state.sections.push(action.payload);
    },
    updateSection: (state, action) => {
      const updatedSection = action.payload;
      const index = state.sections.findIndex(
        (section) => section.id === updatedSection.id
      );
      if (index !== -1) {
        state.sections[index] = updatedSection;
      }
    },
    deleteSection: (state, action) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSections.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSections.fulfilled, (state, action) => {
        state.sections = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllSections.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Error fetching sections';
      });
  },
});

export const { addSection, updateSection, deleteSection } = sectionSlice.actions;
export default sectionSlice.reducer;
