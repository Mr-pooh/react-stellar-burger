import { NORMA_API } from "./api";
import { checkReponse } from "./checkResponse";

export function getIngridient(): Promise<object> {
  return fetch(`${NORMA_API}/ingredients`).then(checkReponse);
}
