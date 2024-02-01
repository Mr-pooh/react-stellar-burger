import { NORMA_API } from "./api";
import { checkResponse } from "./checkResponse";

export type IBody = {
  email?: string;
  token?: string;
  password?: string;
  name?: string;
};

export type TAuth = {
  method?: string;
  headers?: {
    "Content-Type": string;
    authorization: string;
  };
  body?: BodyInit;
};

export type IRefreshToken = {
  readonly url: string;
  options: RequestInit & TAuth;
};

export const getUser = ({ method, body }: TAuth) => ({
  url: `${NORMA_API}/auth/user`,
  options: {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken") || "",
    },
    body: body,
  },
});

export function getForgotPassword(email: IBody | string) {
  return fetch(`${NORMA_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
}

export function getResetPassword({ password, token }: IBody) {
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then(checkResponse);
}

export function getLogin({ email, password }: IBody) {
  return fetch(`${NORMA_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then(checkResponse);
}

export function getLogout() {
  return fetch(`${NORMA_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
}

export function getRegister({ name, email, password }: IBody) {
  return fetch(`${NORMA_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then(checkResponse);
}

export const refreshToken = () => {
  return fetch(`${NORMA_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async ({ url, options }: IRefreshToken) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any | unknown) {
    console.log(err);
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      if (options.headers)
        options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
