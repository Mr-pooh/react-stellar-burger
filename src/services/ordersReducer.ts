import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { TWebSock, WebsocketStatus } from "../utils/wsUtil";
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from "./actions";
import { TOrders } from "../utils/types";
import { RootState } from "./store";

interface IInitialState {
  status: TWebSock | string;
  ordersFeed: TOrders | null;
  connectingError: string | unknown;
}

const initialState: IInitialState = {
  status: WebsocketStatus.OFFLINE,
  ordersFeed: null,
  connectingError: "",
};

export const ordersAllReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = "";
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action: PayloadAction<string>) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action: PayloadAction<TOrders>) => {
      state.ordersFeed = action.payload;
    });
});

export const getStoreAllOrders = (store: RootState) => ({
  status: store.ordersAll.status,
  ordersFeed: store.ordersAll.ordersFeed,
  connectingError: store.ordersAll.connectingError,
});
