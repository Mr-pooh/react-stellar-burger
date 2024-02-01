import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { orderDetailsApi } from "./actions";
import { RootState } from "./store";
import { TDeteils } from "../utils/types";

interface IInitialState {
  loading: boolean;
  hasError: null | unknown;
  data: null | TDeteils;
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
      .addCase(orderDetailsApi.pending, (state) => {
        state.loading = true;
        state.hasError = null;
      })
      .addCase(
        orderDetailsApi.rejected,
        (state, action: PayloadAction<string | unknown>) => {
          state.loading = false;
          state.hasError = action.payload;
        }
      )
      .addCase(
        orderDetailsApi.fulfilled,
        (state, action: PayloadAction<TDeteils>) => {
          state.loading = false;
          state.data = action.payload;
        }
      );
  },
});

export const getStoreOrderDetails = (store: RootState) => ({
  loading: store.orderDetails.loading,
  hasError: store.orderDetails.hasError,
  data: store.orderDetails.data,
});

export default orderDetailsSlice.reducer;
