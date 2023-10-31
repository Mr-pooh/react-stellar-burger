import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    hasError: false,
    cart: {   
        bun: null,
        ingridients: []
    }
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducer: {
        cart: (state, action) => {
            state.cart.bun = action.payload.map(item => {
                if(item.type === 'bun'){
                    return item
                }
            });
            state.cart.ingridients = action.payload.map(item => {
                if(item.type !== 'bun'){
                    return item
                }
            })
        },
        loading: (state) => { 
            state.hasError = false;
            state.loading = true
        },
        hasError: (state) => {
            state.hasError = true;
            state.loading = false
        }
        
    },
});

export const { cart, loading, hasError } = counterSlice.actions;

export default counterSlice.reducer;