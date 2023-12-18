import { useSelector } from "react-redux";
import styles from "./orders.module.css";
import OrderElement from "./orderElement/orderElement";
import { getStoreAllOrders } from "../../services/ordersReducer";
import React from "react";
import { getStoreInitial } from "../../services/initialSlice";
import { getStoreProfileOrders } from "../../services/ordersProfileReducer";
import { useLocation } from "react-router-dom";

export default function Orders() {
  const { ordersFeed } = useSelector(getStoreAllOrders);

  const { ordersProfileFeed } = useSelector(getStoreProfileOrders);

  const { data } = useSelector(getStoreInitial);

  const { pathname } = useLocation();

  const orderElement = () => {
    if (ordersFeed && pathname === "/feed") {
      return ordersFeed.orders.map((item) => {
        let arr = [];
        item.ingredients.forEach((elem) => {
          data.forEach((element) => {
            if (element._id === elem) {
              arr.push(element);
            }
          });
        });
        return <OrderElement item={item} key={item._id} arrIngr={arr} />;
      });
    }
    if (ordersProfileFeed && pathname === "/profile/orders") {
      const arrProfile = ordersProfileFeed.orders.map((item) => {
        let arr = [];
        item.ingredients.forEach((elem) => {
          data.forEach((element) => {
            if (element._id === elem) {
              arr.push(element);
            }
          });
        });
        return <OrderElement item={item} key={item._id} arrIngr={arr} />;
      });
      return arrProfile.reverse();
    } else {
      return <div>Загрузка...</div>;
    }
  };

  return (
    <section
      className={
        pathname === "/profile/orders" ? styles.ordersProfile : styles.orders
      }
    >
      <ul className={styles.table + " custom-scroll"}>{orderElement()}</ul>
    </section>
  );
}
