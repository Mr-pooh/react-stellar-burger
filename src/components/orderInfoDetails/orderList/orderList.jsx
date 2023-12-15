import React from "react";
import styles from "../orderInfoDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export default function OrderList({ item, amount }) {
  return (
    <li className={styles.component}>
      <div className={styles.componentContain}>
        <div className={styles.imageArr}>
          <img
            className={styles.imageIngr}
            src={item.image_mobile}
            alt={item.name}
          />
        </div>
        <h2 className={styles.nameIngr + ` text text_type_main-small`}>
          {item.name}
        </h2>
      </div>
      <div className={styles.containPrice}>
        <p className={`text text_type_digits-default p-1`}>
          {amount} x {item.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  );
}
