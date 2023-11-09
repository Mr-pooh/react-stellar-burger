import { configureStore } from "@reduxjs/toolkit";
import initialReducer from "./initialSlice";
import modalIngredientReducer from "./modalIngredientSlice";
import constructorBurgerReducer from './constructorBurgerSlice';
import orderDetailsReducer from "./orderDetailsSlice";

export const store = configureStore({
    reducer: {
        initial: initialReducer,
        modalIngredient: modalIngredientReducer,
        constructorBurger: constructorBurgerReducer,
        orderDetails: orderDetailsReducer
     },
});