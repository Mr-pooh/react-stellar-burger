import { NORMA_API } from "./api";
import { checkReponse } from "./checkResponse";

export function orderApi(ingridients){
    return fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            "ingredients": ingridients
        })
    })
        .then(checkReponse)
}