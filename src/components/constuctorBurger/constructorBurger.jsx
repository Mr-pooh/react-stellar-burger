import React, { useCallback, useState } from "react";
import styles from "./constructorBurger.module.css";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import SelectedElement from "./selectedElement/selectedElement";
import Modal from "../modal/modal.jsx";
import OrderDetails from "../orderDetails/orderDetails.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import {
  addIngredient,
  addBun,
  ingredientSwitch,
  deleteIngredient,
  getStoreConstructor,
} from "../../services/constructorBurgerSlice.jsx";
import { getStoreOrderDetails } from "../../services/orderDetailsSlice.jsx";
import { useNavigate } from "react-router-dom";
import { orderDetailsApi } from "../../services/actions";

export default function BurgerConstructor() {
  const { bun, ingredients } = useSelector(getStoreConstructor);

  const { loading, hasError, data } = useSelector(getStoreOrderDetails);

  const [modal, setModal] = useState(false);

  const user = useSelector((store) => store.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      itemId.type === "bun" ? addBuns(itemId) : addIngridients(itemId);
    },
  });
  const addIngridients = (item) => {
    dispatch(addIngredient(item));
  };

  const addBuns = (item) => {
    dispatch(addBun(item));
  };

  const summIngridient = () => {
    if (ingredients.length === 0) {
      return 0;
    } else {
      return ingredients.reduce((a, b) => a + b.price, 0);
    }
  };

  const totalPrice = React.useMemo(() => {
    if (bun) {
      return bun.price * 2 + summIngridient();
    }
    if (ingredients.length) {
      return summIngridient();
    } else {
      return 0;
    }
  }, [bun, ingredients]);

  const handleClose = (item) => {
    dispatch(deleteIngredient(item));
  };

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(ingredientSwitch({ toIndex: dragIndex, fromIndex: hoverIndex }));
  }, []);

  const renderCard = useCallback((item, index) => {
    return (
      <SelectedElement
        key={item.id}
        index={index}
        id={item.id}
        name={item.name}
        price={item.price}
        image={item.image}
        handleClose={() => handleClose(item)}
        moveCard={moveCard}
      />
    );
  }, []);

  const pushElement = React.useCallback(() => {
    if (bun !== 0) {
      const mass = [bun._id].concat(ingredients.map((item) => item._id));
      mass.push(bun._id);
      return mass;
    } else {
      return Error;
    }
  }, [bun, ingredients]);

  const open = () => {
    if (!user) {
      navigate("/login");
    } else {
      setModal(true);
    }
  };

  const onClose = () => {
    setModal(false);
  };

  React.useEffect(() => {
    return () => {
      document.removeEventListener("click", onClose);
    };
  });

  React.useEffect(() => {
    if (modal) {
      console.log(pushElement());
      dispatch(orderDetailsApi(pushElement()));
    }
  }, [!modal, dispatch]);

  return (
    <section
      className={styles.constructorBurger + ` text pt-25 ml-10`}
      ref={dropTarget}
    >
      <div className={styles.constructorItems + " pl-4"}>
        {bun ? (
          <div className={styles.list + ` text ml-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name + ` (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <p
            className={`${styles.constructorElement + ` ml-8`} ${
              styles.constructorElementTop
            }`}
          >
            Выберите булки
          </p>
        )}
        {ingredients.length ? (
          <div className={styles.ingridientsSelect + ` custom-scroll`}>
            {ingredients.map((item, i) => renderCard(item, i))}
          </div>
        ) : (
          <p className={styles.constructorElement + ` ml-8`}>
            Выберите начинку
          </p>
        )}
        {bun ? (
          <div className={styles.list + ` text ml-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name + ` (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        ) : (
          <p
            className={`${styles.constructorElement + ` ml-8`} ${
              styles.constructorElementBottom
            }`}
          >
            Выберите булки
          </p>
        )}
        <div className={styles.summ + ` mt-10`}>
          <p className="text text_type_digits-medium pr-10">
            {totalPrice}
            <CurrencyIcon type="primary" />
          </p>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={() => {
              if (bun) {
                open();
              }
            }}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
      {loading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {!loading && !hasError && modal && data && (
        <Modal onClose={onClose}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
