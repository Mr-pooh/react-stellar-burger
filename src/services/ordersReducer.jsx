import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../utils/wsUtil';
import {
  wsConnecting,
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from './actions';

const initialState = {
  status: WebsocketStatus.OFFLINE,
  ordersFeed: null,
  connectingError: ''
}

export const ordersAllReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
          state.status = WebsocketStatus.CONNECTING;
      })
    .addCase(wsOpen, state => {
        state.status = WebsocketStatus.ONLINE;
        state.connectingError = '';
    })
    .addCase(wsClose, state => {
        state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
        state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.ordersFeed = action.payload
    })
})

export const getStoreAllOrders = (store) => ({
    status: store.ordersAll.status,
    ordersFeed: store.ordersAll.ordersFeed,
    connectingError: store.ordersAll.connectingError,
  });