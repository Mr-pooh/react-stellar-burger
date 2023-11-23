import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngridient } from '../../utils/burger-api';
import { initialIngridient } from './actions';


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

export const getStoreInitial = (store) => ({
    loading: store.initial.loading,
    hasError: store.initial.hasError,
    data: store.initial.data
})

export default initialSlice.reducer;