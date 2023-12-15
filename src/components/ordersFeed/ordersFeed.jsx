import Orders from "../orders/orders";
import OrderInfo from "./ordersInfo/ordersInfo";
import styles from "./ordersFeed.module.css";

export default function OrdersFeed() {
  return (
    <section className={styles.section}>
      <h1 className={"text text_type_main-large pt-10 pb-5"}>Лента заказов</h1>
      <div className={styles.orders}>
        <Orders />
        <OrderInfo />
      </div>
    </section>
  );
}
