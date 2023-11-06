import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';





const constructorBurgerSlice = createSlice({
    name: 'constructorBurger',
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        addBun: (state, action)=> {
            state.bun = action.payload
        },
        addIngredient: (state, action) => {
            state.ingredients.push({...action.payload, id: nanoid()})
        },
        deleteIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(item => item.id !== action.payload.id)
        },
        ingredientSwitch: (state, action) => {
            state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0]);
        }
    }
})

export const { addBun, addIngredient, deleteIngredient, ingredientSwitch } = constructorBurgerSlice.actions

export default constructorBurgerSlice.reducer