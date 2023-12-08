import { useSelector } from "react-redux";
import styles from "./orders.module.css";
import OrderElement from "./orderElement/orderElement";
import { getStoreAllOrders } from "../../services/ordersReducer";
import React from "react";
import { getStoreInitial } from "../../services/initialSlice";

export default function Orders() {
  const { ordersFeed } = useSelector(getStoreAllOrders);

  const { data } = useSelector(getStoreInitial);

  const orderElement = () => {
    if (ordersFeed) {
      return ordersFeed.orders.map((item) => {
        let arr = [];
        item.ingredients.map((elem) => {
          data.map((element) => {
            if (element._id === elem) {
              arr.push(element);
            }
          });
        });
        return <OrderElement item={item} key={item._id} arrIngr={arr} />;
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
