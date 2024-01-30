import { createSlice } from "@reduxjs/toolkit";
import { orderDetailsApi } from "./actions";
import { RootState } from "./store";

interface IInitialState {
  loading: boolean;
  hasError: null | string | undefined | unknown;
  data: any;
}

const initialState: IInitialState = {
  loading: false,
  hasError: null,
  data: null,
};

const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
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

export const getStoreOrderDetails = (store: RootState) => ({
  loading: store.orderDetails.loading,
  hasError: store.orderDetails.hasError,
  data: store.orderDetails.data,
});

export default orderDetailsSlice.reducer;
