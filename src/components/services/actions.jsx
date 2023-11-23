import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./userSlice";
import { getIngridient } from "../../utils/burger-api";
import { getLogin, getLogout, getRefreshToken } from "../../utils/auth";

export const getUser = () => {
    return (dispatch) => {
        return getRefreshToken().then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const login = createAsyncThunk(
    "user/login",
    async () => {
        const res = await getLogin();
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")) {
            dispatch(getUser())
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


export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        await getLogout();
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
);



export const initialIngridient = createAsyncThunk(
    'initial/cart',
    async ()=>{
        return await getIngridient()
    }
)