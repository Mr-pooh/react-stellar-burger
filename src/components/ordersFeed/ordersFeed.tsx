import Orders from "../orders/orders";
import OrderInfo from "./ordersInfo/ordersInfo";
import styles from "./ordersFeed.module.css";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { ORDERS_ALL_SERVER_URL } from "../../utils/wsUtil";
import { connect } from "../../services/actions";
import { getStoreAllOrders } from "../../services/ordersReducer";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();

  const { status } = useAppSelector(getStoreAllOrders);

  React.useEffect(() => {
    if (
      location.pathname === "/feed" &&
      status !== "ONLINE" &&
      status !== "CONNECTING..."
    ) {
      dispatch(connect(ORDERS_ALL_SERVER_URL));
    }
  }, [dispatch, location, status]);

  return (
    <section className={styles.section}>
      <h1 className={"text text_type_main-large pt-10 pb-5"}>Лента заказов</h1>
      <div className={styles.orders}>
        <Orders />
        <OrderInfo />
      </div>
    </section>
  );
};

export default OrdersFeed;
