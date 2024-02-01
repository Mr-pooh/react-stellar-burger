import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { TWebSock, WebsocketStatus } from "../utils/wsUtil";
import {
  wsCloseProfile,
  wsConnectingProfile,
  wsErrorProfile,
  wsMessageProfile,
  wsOpenProfile,
} from "./actions";
import { TOrders } from "../utils/types";
import { RootState } from "./store";

interface IInitialState {
  status: TWebSock | string;
  ordersFeed: TOrders | null | undefined;
  connectingError: string | unknown;
}

const initialState: IInitialState = {
  status: WebsocketStatus.OFFLINE,
  ordersFeed: null,
  connectingError: "",
};

export const ordersProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingProfile, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpenProfile, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = "";
    })
    .addCase(wsCloseProfile, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorProfile, (state, action: PayloadAction<string>) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessageProfile, (state, action: PayloadAction<TOrders>) => {
      state.ordersFeed = action.payload;
    });
});

export const getStoreProfileOrders = (store: RootState) => ({
  statusProfile: store.ordersProfile.status,
  ordersProfileFeed: store.ordersProfile.ordersFeed,
  connectingErrorProfile: store.ordersProfile.connectingError,
});
