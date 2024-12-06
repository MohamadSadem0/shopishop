// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { fetchAllCategoriesAPI } from '../../services/fetchingService';

// // Async thunk to fetch categories
// export const fetchAllCategories = createAsyncThunk(
//   'category/fetchCategories',
//   async () => {
//     return await fetchAllCategoriesAPI();
//   }
// );

// const categorySlice = createSlice({
//   name: 'category',
//   initialState: {
//     categories: [],
//     status: 'idle', // 'idle' | 'pending' | 'success' | 'failed'
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllCategories.pending, (state) => {
//         state.status = 'pending';
//       })
//       .addCase(fetchAllCategories.fulfilled, (state, action) => {
//         state.categories = action.payload;
//         state.status = 'success';
//       })
//       .addCase(fetchAllCategories.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.status = 'failed';
//       });
//   },
// });

// export default categorySlice.reducer;


import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchAllSectionsAPI} from "../../services/fetchingService";
import {createCategoryAPI} from "../../services/createProductAPI";
import {deleteCategoryAPI} from "../../services/deleteService";
import {updateCategoryAPI} from "../../services/updateService";

// Async thunk to fetch categories
export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllSectionsAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching categories');
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
  },
  reducers: {
    resetCategories: (state) => {
      state.categories = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateExistingCategory.fulfilled, (state, action) => {
        const updatedCategory = action.payload;
        state.categories = state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
      })
      .addCase(deleteExistingCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload
        );
      });
  },
});

export const { resetCategories } = categorySlice.actions;
export default categorySlice.reducer;
