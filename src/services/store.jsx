import { configureStore } from "@reduxjs/toolkit";
import initialReducer from "./initialSlice";
import modalIngredientReducer from "./modalIngredientSlice";
import constructorBurgerReducer from "./constructorBurgerSlice";
import orderDetailsReducer from "./orderDetailsSlice";
import userReducer from "./userSlice";
import { ordersAllReducer } from "./ordersReducer";

import {
  connect as OrdersAllWsConnect,
  disconnect as OrdersAllWsDisconnect,
  wsOpen as OrdersAllWsOpen,
  wsClose as OrdersAllWsClose,
  wsMessage as OrdersAllWsMessage,
  wsError as OrdersAllWsError,
  wsConnecting as OrdersAllWsConnecting,
  ORDERS_PROFILE_CONNECT,
  ORDERS_PROFILE_DISCONNECT,
  ORDERS_PROFILE_WS_CONNECTING,
  ORDERS_PROFILE_WS_OPEN,
  ORDERS_PROFILE_WS_CLOSE,
  ORDERS_PROFILE_WS_MESSAGE,
  ORDERS_PROFILE_WS_ERROR
} from "./actions";
import { socketMiddleware } from "./middleware/ordersMiddleware";

const OrdersAllMiddleware = socketMiddleware({
  wsConnect: OrdersAllWsConnect,
  wsDisconnect: OrdersAllWsDisconnect,
  wsConnecting: OrdersAllWsConnecting,
  onOpen: OrdersAllWsOpen,
  onClose: OrdersAllWsClose,
  onError: OrdersAllWsError,
  onMessage: OrdersAllWsMessage,
});

const OrdersProfileMiddleware = socketMiddleware({
  wsConnect: ORDERS_PROFILE_CONNECT ,
  wsDisconnect: ORDERS_PROFILE_DISCONNECT,
  wsConnecting: ORDERS_PROFILE_WS_CONNECTING,
  onOpen: ORDERS_PROFILE_WS_OPEN,
  onClose: ORDERS_PROFILE_WS_CLOSE,
  onError: ORDERS_PROFILE_WS_ERROR,
  onMessage: ORDERS_PROFILE_WS_MESSAGE,
})

export const store = configureStore({
  reducer: {
    initial: initialReducer,
    modalIngredient: modalIngredientReducer,
    constructorBurger: constructorBurgerReducer,
    orderDetails: orderDetailsReducer,
    user: userReducer,
    ordersAll: ordersAllReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(OrdersAllMiddleware, OrdersProfileMiddleware);
  },
});
