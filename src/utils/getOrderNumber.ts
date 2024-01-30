import { NORMA_API } from "./api";
import { checkReponse } from "./checkResponse";

export function getOrderNumber(number: number) {
  return fetch(`${NORMA_API}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then(checkReponse);
}
