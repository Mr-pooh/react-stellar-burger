import { NORMA_API } from "./api";
import { TIngredient } from "./types";

export const orderApi = (ingridients: Array<TIngredient> | string[]) => ({
  url: `${NORMA_API}/orders`,
  options: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify({
      ingredients: ingridients,
    }),
  },
});
