import { NORMA_API } from "./api";
import { checkReponse } from "./checkResponse";

export function getLogin(){
    return fetch(`${NORMA_API}/auth/login`)
                .then(checkReponse)
}

export function getLogout(){
    return fetch(`${NORMA_API}/auth/logout`)
                .then(checkReponse)
}

export function getRegister(name, email, password){
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


export const getRefreshToken = () => {
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