import { useSelector } from "react-redux";
import styles from "./orders.module.css";
import OrderElement from "./orderElement/orderElement";
import { getStoreAllOrders } from "../../services/ordersReducer";
import React from "react";

export default function Orders() {
  const { ordersFeed } = useSelector(getStoreAllOrders);

  const orderElement = () => {
    if (ordersFeed) {
      return ordersFeed.orders.map((item) => {
        return <OrderElement item={item} key={item._id} />;
      });
    }
  };
  console.log(ordersFeed);

  return (
    <section className={styles.orders}>
      <ul className={styles.table + " custom-scroll"}>{orderElement()}</ul>
    </section>
  );
}
