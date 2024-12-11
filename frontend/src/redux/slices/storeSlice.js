import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllStoresAPI } from "../../services/fetchingService";

export const fetchAllStores = createAsyncThunk('store/fetchAllStores', async () => { 

  try {
    const data = fetchAllStoresAPI();
    return data
  } catch (error) {
    console.error(error)
  }
})

const storeSlice = createSlice(
  {
    name: 'store',
    initialState: {
      data: [],
      status: "idle",
      error:null
    },
    reducers: {
    },
    extraReducers: (builder) => { 
      builder.addCase(fetchAllStores.fulfilled, (state,action) => {
        state.status = "succeeded";
          state.data = action.payload
      })
        .addCase(fetchAllStores.rejected, (state,action) => {
          state.status = "failed"
          state.error =action.payload || "failed to fetch"
        })
        .addCase(fetchAllStores.pending, (state) => {
          state.status = "loading"
          state.error=null
      })

    }
  }
)
export default storeSlice.reducer