import { useDispatch } from "react-redux";
import Orders from "../orders/orders";
import OrderInfo from "./ordersInfo/ordersInfo";
import { connect } from "../../services/actions";
import React from "react";
import { ORDERS_ALL_SERVER_URL } from "../../utils/wsUtil";
import styles from "./ordersFeed.module.css";

export default function OrdersFeed() {
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   dispatch(connect(ORDERS_ALL_SERVER_URL));
  // }, [dispatch]);

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
