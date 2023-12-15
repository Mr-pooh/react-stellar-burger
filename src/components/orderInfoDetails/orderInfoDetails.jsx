import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./orderInfoDetails.module.css";
import {
  getStoreModalIngredient,
  openModal,
} from "../../services/modalIngredientSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { getStoreInitial } from "../../services/initialSlice";
import { getStoreAllOrders } from "../../services/ordersReducer";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import OrderList from "./orderList/orderList";
import { getOrderNumber } from "../../utils/getOrderNumber";
import { getStoreProfileOrders } from "../../services/ordersProfileReducer";

export default function OrderInfoDetails() {
  const { number } = useParams();

  const { data } = useSelector(getStoreInitial);

  const { ordersFeed } = useSelector(getStoreAllOrders);

  const { ordersProfileFeed } = useSelector(getStoreProfileOrders);

  const { details } = useSelector(getStoreModalIngredient);

  const dispatch = useDispatch();
  const location = useLocation();

  const order = React.useCallback(() => {
    if (ordersFeed && !ordersProfileFeed) {
      return ordersFeed.orders.find((item) => `${item.number}` === number);
    }
    if (ordersProfileFeed && !ordersFeed) {
      return ordersProfileFeed.orders.find(
        (item) => `${item.number}` === number
      );
    }
  }, [number, ordersFeed, ordersProfileFeed]);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (order()) {
      dispatch(openModal(order()));
    }
    if (!order()) {
      getOrderNumber(number)
        .then((res) => {
          if (res.orders.length !== 0) {
            dispatch(openModal(res.orders[0]));
          } else {
            navigate("/feed");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [dispatch, ordersFeed, order, number, navigate]);

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

  const arr = () => {
    if (details.ingredients) {
      let array = [];
      details.ingredients.forEach((item) => {
        data.forEach((elem) => {
          if (elem._id === item) {
            array.push(elem);
          }
        });
      });
      return array;
    }
  };

  const totalPrice = arr() && arr().reduce((a, b) => a + b.price, 0);

  const ingredient = () => {
    if (details.ingredients) {
      const newSet = new Set(arr());
      const arrIngr = Array.from(newSet);
      return arrIngr.map((item) => {
        const sum = 0;
        const amount = arr().reduce((a, b) => {
          if (b === item) {
            a = a + 1;
          }
          return a;
        }, sum);
        return <OrderList key={item._id} item={item} amount={amount} />;
      });
    }
  };

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
        <ul className={styles.ingredientsArr + ` custom-scroll`}>
          {ingredient()}
        </ul>
      </div>
      <div className={styles.info}>
        <p className={`text text_type_main-default text_color_inactive`}>
          <FormattedDate date={new Date(details.createdAt)} /> i-GMT+3
        </p>
        <div className={styles.total}>
          <p className={`text text_type_digits-default p-1`}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
