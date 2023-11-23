import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getIngridient } from '../../utils/burger-api';
import { getLogin, getLogout } from '../../utils/auth';
import { login, logout } from './actions';


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        isAuthChecked: false,
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
            .addCase(login.fulfilled, (state, action) => {
              state.user = action.payload;
              state.isAuthChecked = true;
            })
            .addCase(logout.fulfilled, (state) => {
              state.user = null;
            })
      }
    });
    
    export const { setAuthChecked, setUser } = userSlice.actions;
    
    export default userSlice.reducer;
    