import { createSlice } from "@reduxjs/toolkit";
import { orderDetailsApi } from "./actions";

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: false,
    hasError: null,
    data: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderDetailsApi.pending, (state, action) => {
        state.loading = true;
        state.hasError = null;
      })
      .addCase(orderDetailsApi.rejected, (state, action) => {
        state.loading = false;
        state.hasError = action.payload;
      })
      .addCase(orderDetailsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export const getStoreOrderDetails = (store) => ({
  loading: store.orderDetails.loading,
  hasError: store.orderDetails.hasError,
  data: store.orderDetails.data,
});

export default orderDetailsSlice.reducer;
