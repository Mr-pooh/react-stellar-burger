import React from "react";
import styles from "../ingridients.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, openModal } from "../../../services/modalIngredientSlice";
import { useDrag } from "react-dnd";
import { ingredientPropType } from "../../../utils/prop-types";
import { getStoreConstructor } from "../../../services/constructorBurgerSlice";
import { useLocation, Link } from "react-router-dom";

export default function IngridientsType({ item }) {
  const dispatch = useDispatch();

  const { bun, ingredients } = useSelector(getStoreConstructor);

  const location = useLocation();

  const counterRender = React.useMemo(() => {
    if (bun) {
      if (bun._id === item._id) {
        return <Counter count={2} size="default" extraClass="m-1" />;
      }
    }
    if (ingredients.length) {
      const lengthIngr = ingredients.filter(
        (elem) => elem._id === item._id
      ).length;
      if (lengthIngr) {
        return <Counter count={lengthIngr} size="default" extraClass="m-1" />;
      }
    }
  }, [bun, ingredients]);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

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

  return (
    <Link
      to={`/ingredients/${item._id}`}
      state={{ background: location }}
      className={styles.link}
    >
      <li className={styles.elem + ` mt-6`} onClick={open} ref={dragRef}>
        {counterRender}
        <img src={item.image} alt={item.name} className="pl-4 pr-4" />
        <div className={styles.price}>
          <h4 className="text text_type_digits-default p-1">{item.price}</h4>
          <CurrencyIcon type="primary" />
        </div>
        <p className={styles.custom_text + " text text_type_main-default"}>
          {item.name}
        </p>
      </li>
    </Link>
  );
}

IngridientsType.propTypes = {
  item: ingredientPropType.isRequired,
};
