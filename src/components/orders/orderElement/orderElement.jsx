import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../orders.module.css";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../services/modalIngredientSlice";

export default function OrderElement({ item, arrIngr }) {
  const location = useLocation();

  const dispatch = useDispatch();

  const open = () => {
    dispatch(openModal(item));
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  React.useEffect(() => {
    return () => {
      document.removeEventListener("click", onClose);
    };
  });

  const status = () => {
    if (item.status === "done") {
      return (
        <p className={styles.done + ` text text_type_main-small`}>Выполнен</p>
      );
    }
    if (item.status === "pending") {
      return (
        <p className={styles.pending + ` text text_type_main-small`}>
          В работе
        </p>
      );
    }
    if (item.status === "created") {
      return (
        <p className={styles.created + ` text text_type_main-small`}>Создан</p>
      );
    }
  };

  const arrImg = () => {
    return arrIngr.map((elem, i) => {
      return (
        i < 6 && (
          <li
            key={i}
            className={styles.imageArr}
            style={{ zIndex: arrIngr.length - i }}
            onClick={open}
          >
            {i === 5 && arrIngr.length > 6 ? (
              <>
                <div
                  className={
                    styles.imgOverlay + ` text text_type_main-default `
                  }
                >
                  +{arrIngr.length - 6}
                </div>
                <img
                  alt={elem.name}
                  className={styles.imageIngr}
                  style={{ opacity: 0.6 }}
                  src={elem.image_mobile}
                />
              </>
            ) : (
              <img
                alt={elem.name}
                className={styles.imageIngr}
                src={elem.image_mobile}
              />
            )}
          </li>
        )
      );
    });
  };

  const totalPrice = arrIngr.reduce((a, b) => a + b.price, 0);

  return (
    <Link
      to={
        location.pathname === "/feed"
          ? `/feed/${item.number}`
          : `/profile/orders/${item.number}`
      }
      state={{ background: location }}
      className={styles.link}
    >
      <li className={styles.elem}>
        <div className={styles.header}>
          <h3 className={`text text_type_digits-default`}>#{item.number}</h3>
          <p className={`text text_type_main-default text_color_inactive`}>
            <FormattedDate date={new Date(item.createdAt)} /> i-GMT+3
          </p>
        </div>
        {location.pathname === "/feed" ? (
          <h1 className={styles.name + ` text text_type_main-medium`}>
            {item.name}
          </h1>
        ) : (
          <div className={styles.containerHeader}>
            <h1 className={styles.name + ` text text_type_main-medium`}>
              {item.name}
            </h1>
            {status()}
          </div>
        )}

        <div className={styles.ingredientContainer}>
          <ul className={styles.imageContainer}>{arrImg()}</ul>
          <div className={styles.price}>
            <h4 className="text text_type_digits-default p-1">{totalPrice}</h4>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
  );
}
