import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TIngredient } from "../utils/types";

interface IInitialState {
  active: boolean;
  details: object | TIngredient;
}

const initialState: IInitialState = {
  active: false,
  details: {},
};

const modalIngredientSlice = createSlice({
  name: "modalIngredient",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<TIngredient>) => {
      state.active = true;
      state.details = action.payload;
    },
    closeModal: (state) => {
      state.active = false;
      state.details = {};
    },
  },
});

export const getStoreModalIngredient = (store: RootState) => ({
  active: store.modalIngredient.active,
  details: store.modalIngredient.details,
});

export const { openModal, closeModal } = modalIngredientSlice.actions;

export default modalIngredientSlice.reducer;
