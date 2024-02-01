import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { login, logout, patchUser, register } from "./actions";

export interface ICounterState {
  user: null | {
    email?: string;
    password?: string;
    name?: string;
  };
  hasError: null | string | unknown;
  isAuthChecked: boolean;
  loading: boolean;
}

export interface ILog {
  email: string;
  password: string;
  name?: string;
}

const initialState: ICounterState = {
  user: null,
  hasError: null,
  isAuthChecked: false,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<ILog | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.hasError = null;
        state.loading = true;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<ILog | unknown | null>) => {
          state.hasError = action.payload;
          state.loading = false;
        }
      )
      .addCase(login.fulfilled, (state, action: PayloadAction<ILog>) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(logout.pending, (state) => {
        state.hasError = null;
        state.loading = true;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<unknown>) => {
        state.hasError = action.payload;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.hasError = null;
        state.loading = true;
      })
      .addCase(register.rejected, (state, action: PayloadAction<unknown>) => {
        state.hasError = action.payload;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<ILog>) => {
        state.user = action.payload;
      })
      .addCase(patchUser.fulfilled, (state, action: PayloadAction<ILog>) => {
        state.user = action.payload;
      });
  },
});

export const { setAuthChecked, setUser } = userSlice.actions;

export default userSlice.reducer;
