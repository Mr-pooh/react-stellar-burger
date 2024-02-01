import styles from "./orders.module.css";
import OrderElement from "./orderElement/orderElement";
import { getStoreAllOrders } from "../../services/ordersReducer";
import { FC } from "react";
import { getStoreInitial } from "../../services/initialSlice";
import { getStoreProfileOrders } from "../../services/ordersProfileReducer";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { TIngredient } from "../../utils/types";

const Orders: FC = () => {
  const { ordersFeed } = useAppSelector(getStoreAllOrders);

  const { ordersProfileFeed } = useAppSelector(getStoreProfileOrders);

  const { data } = useAppSelector(getStoreInitial);

  const { pathname } = useLocation();

  const orderElement = () => {
    if (pathname === "/feed") {
      return ordersFeed?.orders.map((item) => {
        let arr: TIngredient[] = [];
        item.ingredients.forEach((elem: TIngredient | string) => {
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
        let arr: TIngredient[] = [];
        item.ingredients.forEach((elem: TIngredient | string) => {
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
};

export default Orders;
