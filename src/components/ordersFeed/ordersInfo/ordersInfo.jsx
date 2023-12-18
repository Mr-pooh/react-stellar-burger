import React from "react";
import styles from "../ordersFeed.module.css";
import { useSelector } from "react-redux";
import { getStoreAllOrders } from "../../../services/ordersReducer";

export default function OrderInfo() {
  const { ordersFeed } = useSelector(getStoreAllOrders);

  const dyveStyle = (type) => {
    if (type !== "done") {
      return { color: "#f2f2f3" };
    }
  };

  const numberElem = (type) => {
    return ordersFeed.orders
      .filter((item) => item.status === type)
      .map((item, i) => {
        return (
          i < 20 && (
            <li
              className={styles.numbersOrder + ` text text_type_digits-default`}
              key={item._id}
              style={dyveStyle(type)}
            >
              {item.number}
            </li>
          )
        );
      });
  };

  return (
    ordersFeed && (
      <section className={styles.info}>
        <div className={styles.container}>
          <div className={styles.containerList}>
            <h5 className={`text text_type_main-medium`}>Готовы:</h5>

            <ul className={styles.numberList}>{numberElem("done")}</ul>
          </div>
          <div className={styles.containerList}>
            <h5 className={`text text_type_main-medium`}>В Работе:</h5>
            <ul className={styles.numberList}>{numberElem("pending")}</ul>
          </div>
        </div>
        <div>
          <h5 className={`text text_type_main-medium`}>
            Выполнено за все время:
          </h5>
          <p className={styles.total + ` text text_type_digits-large`}>
            {ordersFeed.total}
          </p>
        </div>
        <div>
          <h5 className={`text text_type_main-medium`}>
            Выполнено за сегодня:
          </h5>
          <p className={styles.total + ` text text_type_digits-large`}>
            {ordersFeed.totalToday}
          </p>
        </div>
      </section>
    )
  );
}
