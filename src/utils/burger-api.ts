import { NORMA_API } from "./api";
import { checkResponse } from "./checkResponse";

export function getIngridient() {
  return fetch(`${NORMA_API}/ingredients`).then(checkResponse);
}
