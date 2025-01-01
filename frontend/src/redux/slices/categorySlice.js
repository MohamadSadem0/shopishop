import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllApprovedStoresAPI,
  fetchAllCategoriesAPI,
  fetchCategoriesBySectionIdAPI,
  fetchCategoriesBySectionNameAPI,
  fetchCategoriesByStoreIdAPI,
} from '../../services/fetchingService';
import { createCategoryAPI } from '../../services/createProductAPI';
import { deleteCategoryAPI } from '../../services/deleteService';
import { updateCategoryAPI } from '../../services/updateService';

// Async thunk to fetch all categories
export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllCategoriesAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching categories');
    }
  }
);
export const fetchCategoriesByStoreId = createAsyncThunk(
  'category/fetchCategoriesByStoreId',
  async ({ storeId }, { rejectWithValue }) => {
    try {
      return await fetchCategoriesByStoreIdAPI(storeId);
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching categories by store ID');
    }
  }
);
// Async thunk to create a new category
export const createNewCategory = createAsyncThunk(
  'category/createNewCategory',
  async ({ category, sectionId }, { rejectWithValue }) => {
    try {
      return await createCategoryAPI(category, sectionId);
    } catch (error) {
      return rejectWithValue(error.message || 'Error creating category');
    }
  }
);

// Async thunk to update a category
export const updateExistingCategory = createAsyncThunk(
  'category/updateExistingCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      return await updateCategoryAPI(categoryId, categoryData);
    } catch (error) {
      return rejectWithValue(error.message || 'Error updating category');
    }
  }
);

// Async thunk to fetch categories by section (by section name)
export const fetchCategoriesBySection = createAsyncThunk(
  'category/fetchCategoriesBySection',
  async (sectionName, { rejectWithValue }) => {
    try {
      return await fetchCategoriesBySectionNameAPI(sectionName);
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching categories by section name');
    }
  }
);

// Async thunk to delete a category
export const deleteExistingCategory = createAsyncThunk(
  'category/deleteExistingCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await deleteCategoryAPI(categoryId);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.message || 'Error deleting category');
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    categoryStatus: 'idle', // Separate state for specific category fetching
    categoryError: null,
    storeCategories: [], // State to store categories fetched by store ID
    storeCategoriesStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    storeCategoriesError: null,
  },
  reducers: {
    resetCategories: (state) => {
      state.categories = [];
      state.status = 'idle';
      state.error = null;
      state.categoryStatus = 'idle';
      state.categoryError = null;
      state.storeCategories = [];
      state.storeCategoriesStatus = 'idle';
      state.storeCategoriesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchAllCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(fetchCategoriesByStoreId.pending, (state) => {
        state.storeCategoriesStatus = 'loading';
      })
      .addCase(fetchCategoriesByStoreId.fulfilled, (state, action) => {
        state.storeCategories = action.payload;
        state.storeCategoriesStatus = 'succeeded';
      })
      .addCase(fetchCategoriesByStoreId.rejected, (state, action) => {
        state.storeCategoriesError = action.payload;
        state.storeCategoriesStatus = 'failed';
      })

      // Create new category
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })

      // Update existing category
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
      })

      // Delete a category
      .addCase(deleteExistingCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      })

      // Fetch categories by section
      .addCase(fetchCategoriesBySection.pending, (state) => {
        state.categoryStatus = 'loading';
        state.categoryError = null;
      })
      .addCase(fetchCategoriesBySection.fulfilled, (state, action) => {
        state.categoryStatus = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesBySection.rejected, (state, action) => {
        state.categoryStatus = 'failed';
        state.categoryError = action.payload;
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
