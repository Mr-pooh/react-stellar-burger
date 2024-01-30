import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialIngridient } from "./actions";
import { RootState } from "./store";
import { TIngredient } from "../utils/types";

interface IDataArr<item> {
  data: [item];
  success: boolean;
}

interface IInitialState {
  loading: boolean;
  hasError: null | unknown;
  data: TIngredient[];
}

const initialState: IInitialState = {
  loading: false,
  hasError: null,
  data: [],
};

const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initialIngridient.pending, (state) => {
        state.loading = true;
        state.hasError = null;
      })
      .addCase(
        initialIngridient.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.hasError = action.payload;
        }
      )
      .addCase(
        initialIngridient.fulfilled,
        (state, action: PayloadAction<IDataArr<TIngredient>>) => {
          action.payload.data.map((item: TIngredient) => state.data.push(item));
        }
      );
  },
});

export const getStoreInitial = (store: RootState) => ({
  loading: store.initial.loading,
  hasError: store.initial.hasError,
  data: store.initial.data,
});

export default initialSlice.reducer;
