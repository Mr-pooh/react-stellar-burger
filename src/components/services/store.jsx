import { configureStore } from "@reduxjs/toolkit";
import initialReducer from "./initialSlice";
import modalIngredientReducer from "./modalIngredientSlice";


export const store = configureStore({
    reducer: {
        initial: initialReducer,
        modalIngredient: modalIngredientReducer,
     },
});