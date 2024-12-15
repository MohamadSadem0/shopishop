import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveStoreAPI, fetchAllStoresAPI, fetchAllApprovedStoresAPI } from "../../services/fetchingService";

// Thunk to fetch all stores
export const fetchAllStores = createAsyncThunk('store/fetchAllStores', async () => {
  try {
    const data = await fetchAllStoresAPI(); // Await API
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk to fetch all approved stores
export const fetchApprovedStores = createAsyncThunk('store/fetchApprovedStores', async () => {
  try {
    const data = await fetchAllApprovedStoresAPI(); // Await API for approved stores
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

// Thunk to approve a store
export const approveStore = createAsyncThunk('store/approveStore', async ({ storeID }) => {
  try {
    const data = await approveStoreAPI(storeID); // Await API
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
});

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    data: [], // All stores
    filteredData: [], // Filtered stores
    approvedStores: [], // Approved stores
    status: "idle",
    error: null,
  },
  reducers: {
    resetStores: (state) => {
      state.data = [];
      state.filteredData = [];
      state.approvedStores = [];
      state.status = 'idle';
      state.error = null;
    },
    filterStoresBySection: (state, action) => {
      const sectionName = action.payload;

      // Filter based on sectionName and ensure data is valid
      if (sectionName) {
        // Filter from approvedStores or data based on use case
        state.filteredData = state.approvedStores.length > 0 
          ? state.approvedStores.filter(store => store.sectionName === sectionName)
          : state.data.filter(store => store.sectionName === sectionName);
      } else {
        // If no sectionName is provided, reset to all approved stores or all stores
        state.filteredData = state.approvedStores.length > 0 ? state.approvedStores : state.data;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all stores
      .addCase(fetchAllStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.filteredData = action.payload; // Initially display all stores
      })
      .addCase(fetchAllStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch stores.";
      })
      // Fetch approved stores
      .addCase(fetchApprovedStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchApprovedStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.approvedStores = action.payload;
      })
      .addCase(fetchApprovedStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch approved stores.";
      })
      // Approve store
      .addCase(approveStore.fulfilled, (state, action) => {
        const updatedStore = action.payload;
        state.data = state.data.map(store => store.id === updatedStore.id ? updatedStore : store);
        state.filteredData = state.filteredData.map(store => store.id === updatedStore.id ? updatedStore : store);
      });
  },
});


export const { resetStores, filterStoresBySection } = storeSlice.actions;
export default storeSlice.reducer;
