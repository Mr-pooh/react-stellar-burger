import { createReducer } from "@reduxjs/toolkit";
import { WebsocketStatus } from "../utils/wsUtil";
import { wsCloseProfile, wsConnectingProfile, wsErrorProfile, wsMessageProfile, wsOpenProfile } from "./actions";

const initialState = {
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
    .addCase(wsErrorProfile, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessageProfile, (state, action) => {
      state.ordersFeed = action.payload;
    });
});

export const getStoreProfileOrders = (store) => ({
  statusProfile: store.ordersProfile.status,
  ordersProfileFeed: store.ordersProfile.ordersFeed,
  connectingErrorProfile: store.ordersProfile.connectingError,
});
