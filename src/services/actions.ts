import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setUser, setAuthChecked } from "./userSlice";
import { getIngridient } from "../utils/burger-api";
import {
  IBody,
  fetchWithRefresh,
  getLogin,
  getLogout,
  getRegister,
  getUser,
} from "../utils/auth";
import { orderApi } from "../utils/order-api";
import { AppDispatch } from "./store";

export const userAuth = () => {
  return (dispatch: AppDispatch) => {
    return fetchWithRefresh(getUser({ method: "GET" })).then((res: any) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUser = createAsyncThunk(
  "user/patchUser",
  async ({ email, name }: IBody) => {
    const res = await fetchWithRefresh(
      getUser({
        method: "PATCH",
        body: JSON.stringify({ name: name, email: email }),
      })
    );
    
      return res.user;
    
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: IBody) => {
    const res = await getLogin({ email, password });
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password }: IBody) => {
    const res = await getRegister({ name, email, password });
    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return res.user;
  }
);

export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(userAuth())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

export const logout = createAsyncThunk("user/logout", async () => {
  await getLogout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
});

export const initialIngridient = createAsyncThunk("initial/cart", async () => {
  return await getIngridient();
});

export const orderDetailsApi = createAsyncThunk(
  "orderDetails/api",
  async (ingredients: any) => {
    return await fetchWithRefresh(orderApi(ingredients));
  }
);

export const connect = createAction("ORDERS_ALL_CONNECT");
export const disconnect = createAction("ORDERS_ALL_DISCONNECT");
export const wsConnecting = createAction("ORDERS_ALL_WS_CONNECTING");
export const wsOpen = createAction("ORDERS_ALL_WS_OPEN");
export const wsClose = createAction("ORDERS_ALL_WS_CLOSE");
export const wsMessage = createAction("ORDERS_ALL_WS_MESSAGE");
export const wsError = createAction("ORDERS_ALL_WS_ERROR");

export const connectProfile = createAction("ORDERS_PROFILE_CONNECT");
export const disconnectProfile = createAction("ORDERS_PROFILE_DISCONNECT");
export const wsConnectingProfile = createAction("ORDERS_PROFILE_WS_CONNECTING");
export const wsOpenProfile = createAction("ORDERS_PROFILE_WS_OPEN");
export const wsCloseProfile = createAction("ORDERS_PROFILE_WS_CLOSE");
export const wsMessageProfile = createAction("ORDERS_PROFILE_WS_MESSAGE");
export const wsErrorProfile = createAction("ORDERS_PROFILE_WS_ERROR");

