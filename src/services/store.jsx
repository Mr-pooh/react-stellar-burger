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
    return getDefaultMiddleware().concat(OrdersAllMiddleware);
  },
});
