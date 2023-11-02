import { createSlice } from '@reduxjs/toolkit';

const constructorBurgerSlice = createSlice({
    name: 'constructorBurger',
    initialState: {
        bun: null,
        ingredients: []
    },
    reducers: {
        addBun: (state, action)=> {
            if(action.payload.type === 'bun'){
                state.bun = action.payload
            }
        },
        addIngredient: (state, action) => {
            if(action.payload.type !== 'bun'){
                state.ingredients.push(action.payload)
            }
        },
        deleteIngredient: (state, action) => {
            if(action.payload.type !== 'bun'){
                state.ingredients.filter(item => item === action.payload)
            }
        }
    }
})

export const { addBun, addIngredient, deleteIngredient } = constructorBurgerSlice.actions

export default constructorBurgerSlice.reducer