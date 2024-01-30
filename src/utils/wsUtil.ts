export type TWebSock = {
  CONNECTING: "CONNECTING...";
  ONLINE: "ONLINE";
  OFFLINE: "OFFLINE";
};

export const WebsocketStatus: TWebSock = {
  CONNECTING: "CONNECTING...",
  ONLINE: "ONLINE",
  OFFLINE: "OFFLINE",
};

export const ORDERS_ALL_SERVER_URL: string =
  "wss://norma.nomoreparties.space/orders/all";

export const ORDERS_PROFILE_SERVER_URL: string =
  "wss://norma.nomoreparties.space/orders";
