import { NORMA_API } from "./api";

export const orderApi = (ingridients) => ({
  url: `${NORMA_API}/orders`,
  options: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      ingredients: ingridients,
    }),
  },
});
