import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchAllProductsAPI,
  fetchProductByIdAPI,
  fetchProductsByCategoryAPI,
  fetchProductsByStoreIdAPI,

} from '../../services/fetchingService';
import {  createProductAPI} from "../../services/createProductAPI"
import {  
  updateProductAPI} from "../../services/updateService"
import {    deleteProductAPI,
} from "../../services/deleteService"

// Async Thunks
export const fetchAllProducts = createAsyncThunk(
  'product/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllProductsAPI();
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching all products');
    }
  }
);



export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      return await fetchProductByIdAPI(productId);
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching product by ID');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      return await fetchProductsByCategoryAPI(categoryId);
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching products by category');
    }
  }
);

export const fetchProductsByStore = createAsyncThunk(
  'product/fetchProductsByStore',
  async (storeId, { rejectWithValue }) => {
    try {
      return await fetchProductsByStoreIdAPI(storeId);
    } catch (error) {
      return rejectWithValue(error.message || 'Error fetching products by store');
    }
  }
);

export const createNewProduct = createAsyncThunk(
  'product/createNewProduct',
  async (productData, { rejectWithValue }) => {
    try {
      return await createProductAPI(productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Error creating product');
    }
  }
);

export const deleteExistingProduct = createAsyncThunk(
  'product/deleteExistingProduct',
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProductAPI(productId);
      return productId; // Return the deleted product ID
    } catch (error) {
      return rejectWithValue(error.message || 'Error deleting product');
    }
  }
);

export const updateExistingProduct = createAsyncThunk(
  'product/updateExistingProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      return await updateProductAPI(productId, productData);
    } catch (error) {
      return rejectWithValue(error.message || 'Error updating product');
    }
  }
);

// Initial State
const initialState = {
  products: [],
  filteredProducts: [], // For any filtered view
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Product Slice
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.products = [];
      state.filteredProducts = [];
      state.status = 'idle';
      state.error = null;
    },
    clearProducts: (state) => {
      state.products = []; // Clear all products
    },
    filterProductsByCategory: (state, action) => {
      const category = action.payload;
      state.filteredProducts = state.products.filter((product) => product.category === category);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload; // Initially show all products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const product = action.payload;
        const index = state.products.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          state.products[index] = product;
        } else {
          state.products.push(product);
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Products By Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch Products By Store
      .addCase(fetchProductsByStore.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByStore.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProductsByStore.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create New Product
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Delete Existing Product
      .addCase(deleteExistingProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
        state.filteredProducts = state.filteredProducts.filter((product) => product.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(deleteExistingProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Update Existing Product
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        const index = state.products.findIndex((p) => p.id === updatedProduct.id);
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
        state.status = 'succeeded';
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Export Actions and Reducer
export const { resetProductState,clearProducts, filterProductsByCategory } = productSlice.actions;
export default productSlice.reducer;
