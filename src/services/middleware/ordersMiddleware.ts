import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { refreshToken } from "../../utils/auth";
import { AppDispatch, RootState } from "../store";
import { TOrders } from "../../utils/types";

type TWsAction = {
  wsConnect: ActionCreatorWithPayload<string>;
  wsSendMessage?: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TOrders>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
};

export const socketMiddleware = (wsActions: TWsAction): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError("Error"));
        };

        socket.onmessage = (event) => {
          const { data } = event;

          const parsedData = JSON.parse(data);
          if (parsedData.message === "Invalid or missing token") {
            refreshToken()
              .then((res) => {
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("accessToken", res.accessToken);
              })
              .then(() => {
                socket = new WebSocket(action.payload);
                dispatch(wsConnecting());
              });
          } else {
            dispatch(onMessage(parsedData));
          }
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        if (wsSendMessage && type === wsSendMessage.type) {
          const set: ReturnType<typeof setTimeout> = setTimeout(
            () => (socket ? socket.send(JSON.stringify(action.payload)) : null),
            1000
          );
          clearTimeout(set);
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
