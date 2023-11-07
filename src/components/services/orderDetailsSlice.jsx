import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderApi } from '../../utils/order-api';

export const orderDetailsApi = createAsyncThunk(
    'orderDetails/api',
    async (ingredients)=>{
        return await orderApi(ingredients)
    }
)

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        loading: false,
        hasError: null,
        data: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderDetailsApi.pending, (state, action)=>{
                state.loading = true;
                state.hasError = null;
            })
            .addCase(orderDetailsApi.rejected, (state, action) => {
                state.loading = false;
                state.hasError = action.payload;
            })
            .addCase(orderDetailsApi.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            
            })
        
        }
    });

    export default orderDetailsSlice.reducer