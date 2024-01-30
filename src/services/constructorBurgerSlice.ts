import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { orderDetailsApi } from "./actions";
import { RootState } from "./store";
import { TIngredient } from "../utils/types";

interface IInitialState {
  bun: null | TIngredient;
  ingredients: TIngredient[];
}

const initialState: IInitialState = {
  bun: null,
  ingredients: [],
};

const constructorBurgerSlice = createSlice({
  name: "constructorBurger",
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TIngredient>) => {
        state.ingredients.push(action.payload);
      },
      prepare: (item: TIngredient) => {
        const id = nanoid();
        return { payload: { ...item, id } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    ingredientSwitch: (
      state,
      action: PayloadAction<{ toIndex: number; fromIndex: number }>
    ) => {
      state.ingredients.splice(
        action.payload.toIndex,
        0,
        state.ingredients.splice(action.payload.fromIndex, 1)[0]
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(orderDetailsApi.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
    });
  },
});

export const getStoreConstructor = (store: RootState) => ({
  bun: store.constructorBurger.bun,
  ingredients: store.constructorBurger.ingredients,
});

export const { addBun, addIngredient, deleteIngredient, ingredientSwitch } =
  constructorBurgerSlice.actions;

export default constructorBurgerSlice.reducer;
