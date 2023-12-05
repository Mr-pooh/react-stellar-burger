import React from "react";
import styles from "../ordersFeed.module.css";
import { useSelector } from "react-redux";
import { getStoreAllOrders } from "../../../services/ordersReducer";

export default function OrderInfo() {
  const { ordersFeed } = useSelector(getStoreAllOrders);

  const numberElem = () => {
    return ordersFeed.orders.map((item, i) => {
      if (item.status === "done" && i < 10) {
        return (
          <li className={` text text_type_digits-default`} key={item._id}>
            {item.number}
          </li>
        );
      }
    });
  };

  return (
    <>
      {ordersFeed && (
        <section className={styles.info}>
          <div>
            <ul>
              <h5>Готовы:</h5>
              {numberElem()}
            </ul>
            <ul>
              <h5>В Работе:</h5>
            </ul>
          </div>
          <div>
            <h5 className={`text text_type_main-medium`}>
              Выполнено за все время:
            </h5>
            <p className={`text text_type_digits-large`}>{ordersFeed.total}</p>
          </div>
          <div>
            <h5 className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </h5>
            <p className={`text text_type_digits-large`}>
              {ordersFeed.totalToday}
            </p>
          </div>
        </section>
      )}
    </>
  );
}
