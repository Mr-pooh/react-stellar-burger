import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { orderDetailsApi } from './orderDetailsSlice';

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
        addIngredient: { 
            reducer: (state, action) => {
                state.ingredients.push(action.payload)
            },
            prepare: (item)=>{
                const id = nanoid();
                return {payload: {...item, id}}
            }
        },
        deleteIngredient: (state, action) => {
            state.ingredients = state.ingredients.filter(item => item.id !== action.payload.id)
        },
        ingredientSwitch: (state, action) => {
            state.ingredients.splice(action.payload.toIndex, 0, state.ingredients.splice(action.payload.fromIndex, 1)[0]);
        }
    },
    extraReducers: (builder) => {
        builder 
            .addCase(orderDetailsApi.fulfilled, (state, action) => {
                state.bun = null
                state.ingredients = []
            })
        
        }
});

export const getStoreConstructor = (store) => ({
        bun: store.constructorBurger.bun,
        ingredients: store.constructorBurger.ingredients
    })

export const { addBun, addIngredient, deleteIngredient, ingredientSwitch } = constructorBurgerSlice.actions

export default constructorBurgerSlice.reducer