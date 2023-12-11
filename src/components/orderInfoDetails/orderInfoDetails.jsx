import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./orderInfoDetails.module.css";
import {
  getStoreModalIngredient,
  openModal,
} from "../../services/modalIngredientSlice";
import { useLocation, useParams } from "react-router-dom";

import { getStoreInitial } from "../../services/initialSlice";
import { getStoreAllOrders } from "../../services/ordersReducer";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderList from "./orderList/orderList";

export default function OrderInfoDetails() {
  const { number } = useParams();

  const { data } = useSelector(getStoreInitial);

  const { ordersFeed } = useSelector(getStoreAllOrders);

  const { details } = useSelector(getStoreModalIngredient);

  const dispatch = useDispatch();

  const order = React.useCallback(() => {
    if (ordersFeed) {
      return ordersFeed.orders.find((item) => `${item.number}` === number);
    }
  }, [number, ordersFeed]);

  console.log(order());

  React.useEffect(() => {
    if (ordersFeed) {
      dispatch(openModal(order()));
    }
  }, [dispatch, ordersFeed, order]);

  const location = useLocation();

  const background = location.state && location.state.background;

  const status = () => {
    if (details.status === "done") {
      return (
        <p className={styles.done + ` text text_type_main-small`}>Выполнен</p>
      );
    }
    if (details.status === "pending") {
      return (
        <p className={styles.pending + ` text text_type_main-small`}>
          В работе
        </p>
      );
    }
    if (details.status === "created") {
      return (
        <p className={styles.created + ` text text_type_main-small`}>Создан</p>
      );
    }
  };

  const ingredient = () => {
    if (details.ingredients) {
      let arr = [];
      details.ingredients.forEach((item) => {
        data.forEach((elem) => {
          if (elem._id === item) {
            arr.push(elem);
          }
        });
      });
      return new Set(arr)
    }
  };

  console.log(ingredient());

  return (
    <div
      className={
        background
          ? styles.orderModalBlock
          : styles.orderModalBlock + " " + styles.nullModal
      }
    >
      <h2 className={styles.number + ` text text_type_digits-default`}>
        #{details.number}
      </h2>
      <div className={styles.nameContainer}>
        <h1 className={`text text_type_main-medium`}>{details.name}</h1>
        {status()}
      </div>
      <div className={styles.containerIngredients}>
        <h3 className={`text text_type_main-medium`}>Состав:</h3>
        <ul className={styles.ingredientsArr}></ul>
      </div>
      <div className={styles.info}>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(details.createdAt)} /> i-GMT+3
        </p>
        <div>
          <p></p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
