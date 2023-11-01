import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngridient } from '../../utils/burger-api';

export const initialIngridient = createAsyncThunk(
    'initial/cart',
    async ()=>{
        return await getIngridient()
    }
)



const initialSlice = createSlice({
    name: 'initial',
    initialState: {
        loading: false,
        hasError: null,
        data: []
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialIngridient.pending, (state, action)=>{
                state.loading = true;
                state.hasError = null;
            })
            .addCase(initialIngridient.rejected, (state, action) => {
                state.loading = false;
                state.hasError = action.payload;
            })
            .addCase(initialIngridient.fulfilled, (state, action) => {
                action.payload.data.map(item => {
                    return state.data.push(item)
                })
            
            })
        
        }
    });
                    //reducer: {
    //    cart: (state, action) => {
    //        state.cart.bun = action.payload.map(item => {
    //            if(item.type === 'bun'){
    //                return item
    //            }
    //        });
    //        state.cart.ingridients = action.payload.map(item => {
    //            if(item.type !== 'bun'){
    //                return item
    //            }
    //        })
    //    },
    //    loading: (state) => { 
    //        state.hasError = false;
    //        state.loading = true
    //    },
    //    hasError: (state) => {
    //        state.hasError = true;
    //        state.loading = false
    //    }
    //    
    //},


//export const { cart, loading, hasError } = counterSlice.actions;

export default initialSlice.reducer;