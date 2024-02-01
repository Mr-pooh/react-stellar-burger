import { NORMA_API } from "./api";
import { checkResponse } from "./checkResponse";

export function getOrderNumber(number?: string) {
  return fetch(`${NORMA_API}/orders/${number}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  }).then(checkResponse);
}
