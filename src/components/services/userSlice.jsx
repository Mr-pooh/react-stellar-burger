import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngridient } from '../../utils/burger-api';
import { getLogin, getLogout } from '../../utils/auth';
import { login, logout, register } from './actions';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        hasError: null,
        isAuthChecked: false,
        loading: false
    },
    reducers: {
        setAuthChecked: (state, action) => {
          state.isAuthChecked = action.payload;
        },
        setUser: (state, action) => {
          state.user = action.payload;
        },
      },
      extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
              state.hasError = null;
              state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
              state.hasError = action.payload;
              state.loading = false;
            })
            .addCase(login.fulfilled, (state, action) => {
              state.user = action.payload;
              state.isAuthChecked = true;
            })
            .addCase(logout.pending, (state) => {
              state.hasError = null;
              state.loading = true;
            })
            .addCase(logout.rejected, (state, action) => {
              state.hasError = action.payload;
              state.loading = false
            })
            .addCase(logout.fulfilled, (state) => {
              state.user = null;
            })
            .addCase(register.pending, (state) => {
              state.hasError = null;
              state.loading = true;
            })
            .addCase(register.rejected, (state, action) => {
              state.hasError = action.payload;
              state.loading = false
            })
            .addCase(register.fulfilled, (state, action) => {
              state.user = action.payload;
            })

      }
    });
    
    export const { setAuthChecked, setUser } = userSlice.actions;
    
    export default userSlice.reducer;
    