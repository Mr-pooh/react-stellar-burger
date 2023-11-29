import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUser, setAuthChecked} from "./userSlice";
import { getIngridient } from "../../utils/burger-api";
import { fetchWithRefresh, getForgotPassword, getLogin, getLogout, getRegister, getResetPassword, getUser } from "../../utils/auth";

export const userAuth = () => {
    return (dispatch) => {
        return fetchWithRefresh(getUser({method: 'GET'})).then((res) => {
            dispatch(setUser(res.user));
        });
    };
};

export const patchUser = createAsyncThunk(
    "user/patchUser",
    async ({email, name})=> {
        const res = await fetchWithRefresh(getUser({method: 'PATCH', body: JSON.stringify({name: name, email: email})}))
        return res.user
        
    }
)

export const forgotPassword = (email, navigate) => {
    return async () => {
        try {
            const res = await getForgotPassword(email);
            localStorage.setItem('resetPass', res.message);
            if(localStorage.getItem('resetPass')){
                return navigate()
            }
            
        } catch (err) {
            return console.log(err);
        }
    }
}

export const resetPassword = ({password, token}, navigate) => {
    return async () => {
        try {
            const res = await getResetPassword({password, token});
            localStorage.removeItem('resetPass')
            if(res.success){
                return navigate()
            }
            
            
        } catch (err) {
            return console.log(err);
        }
    }
}

export const login = createAsyncThunk(
    "user/login",
    async ({email, password}) => {
        const res = await getLogin({email, password});
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const register = createAsyncThunk(
    "user/register",
    async ({name, email, password}) => {
        const res = await getRegister({name, email, password});
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        return res.user;
    }
);

export const checkUserAuth = () => {
    return (dispatch) => {
        if (localStorage.getItem("accessToken")){
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