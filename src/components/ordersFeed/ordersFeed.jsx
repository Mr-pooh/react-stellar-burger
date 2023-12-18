import Orders from "../orders/orders";
import OrderInfo from "./ordersInfo/ordersInfo";
import styles from "./ordersFeed.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { ORDERS_ALL_SERVER_URL } from "../../utils/wsUtil";
import { connect } from "../../services/actions";
import { getStoreAllOrders } from "../../services/ordersReducer";

export default function OrdersFeed() {
  const dispatch = useDispatch();

  const location = useLocation();

  const { status } = useSelector(getStoreAllOrders);

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
}
