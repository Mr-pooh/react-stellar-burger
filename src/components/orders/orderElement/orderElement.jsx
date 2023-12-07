import { Link, useLocation } from "react-router-dom";
import styles from '../orders.module.css'
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";



export default function OrderElement({item}){

    const location = useLocation()

 

    return(
    <Link
      to={`/feed/${item.number}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li className={styles.elem} >
        <div className={styles.header}>
          <h3 className={`text text_type_digits-default`}>#{item.number}</h3>
          <p className={`text text_type_main-default text_color_inactive`}><FormattedDate date={new Date(item.createdAt)}  /> i-GMT+3</p>
        </div>
        <h1 className={styles.name +` text text_type_main-smal`}>{item.name}</h1>
        <div className={styles.ingredientContainer}>
          <div className={styles.imageIngr}>sssssssssssssssssss</div>
          <div className={styles.price}>
            <h4 className="text text_type_digits-default p-1">250</h4>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </li>
    </Link>
    )
}