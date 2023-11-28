import { NORMA_API } from "./api";
import { checkReponse } from "./checkResponse";


export const getUser = ({method, body}) => 
  ({
  url: `${NORMA_API}/auth/user`,
  options: {
    method: method,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem("accessToken")
    },
    body: body
  }
})

export function getForgotPassword(email){
  return fetch(`${NORMA_API}/password-reset`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email
    })
  })
  .then(checkReponse)
}

export function getResetPassword({password, token}){
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password: password,
      token: token
    })
  })
  .then(checkReponse)
}

export function getLogin({email, password}){
    return fetch(`${NORMA_API}/auth/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(checkReponse)
}

export function getLogout(){
    return fetch(`${NORMA_API}/auth/logout`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken")
      })
    })
                .then(checkReponse)
}

export function getRegister({name, email, password}){
    return fetch(`${NORMA_API}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        body: JSON.stringify({
            email: email, 
            password: password, 
            name: name 
        })
    })
                .then(checkReponse)
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
    }).then(checkReponse);
  };

  export const fetchWithRefresh = async ({url, options}) => { 
    try {
      const res = await fetch(url, options);
      return await checkReponse(res);
    } catch (err) {
      console.log(err)
      if (err.message === "jwt expired") {
        const refreshData = await refreshToken(); //обновляем токен
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        localStorage.setItem("refreshToken", refreshData.refreshToken);
        localStorage.setItem("accessToken", refreshData.accessToken);
        options.headers.authorization = refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return await checkReponse(res);
      } else {
        return Promise.reject(err);
      }
    }
  };