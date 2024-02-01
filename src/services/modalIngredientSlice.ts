import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TIngredient, TOrder } from "../utils/types";
interface IInitialState {
  active: boolean;
  details: (TOrder | null) & (TIngredient | null);
}

const initialState: IInitialState = {
  active: false,
  details: null,
};

const modalIngredientSlice = createSlice({
  name: "modalIngredient",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<any>) => {
      state.active = true;
      state.details = action.payload;
    },
    closeModal: (state) => {
      state.active = false;
      state.details = null;
    },
  },
});

export const getStoreModalIngredient = (store: RootState) => ({
  active: store.modalIngredient.active,
  details: store.modalIngredient.details,
});

export const { openModal, closeModal } = modalIngredientSlice.actions;

export default modalIngredientSlice.reducer;
