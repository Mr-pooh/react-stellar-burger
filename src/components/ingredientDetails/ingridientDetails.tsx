import styles from "./ingridientDetails.module.css";
import {
  getStoreModalIngredient,
  openModal,
} from "../../services/modalIngredientSlice";
import { useLocation, useParams } from "react-router-dom";
import React, { FC } from "react";
import { getStoreInitial } from "../../services/initialSlice";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";

const IngridientDetails: FC = () => {
  const { id } = useParams();

  const { data } = useAppSelector(getStoreInitial);

  const dispatch = useAppDispatch();

  const ingridient = React.useCallback(() => {
    if (data.length) {
      return data.find((item) => item._id === id);
    }
  }, [id, data]);

  const { details, active } = useAppSelector(getStoreModalIngredient);

  React.useEffect(() => {
    if (data.length && !active) {
      dispatch(openModal(ingridient()));
    }
  }, [active, data.length, dispatch, ingridient]);

  const location = useLocation();

  const background = location.state && location.state.background;

  console.log(background);
  return (
    <div
      className={
        background
          ? styles.ingridentModalBlock
          : styles.ingridentModalBlock + " " + styles.nullModal
      }
    >
      <h1
        className={
          styles.title + ` text text_type_main-large pt-10 pl-10 pr-10`
        }
      >
        Детали ингредиента
      </h1>
      <div className={styles.main + ` pb-15`}>
        <img
          className={styles.image}
          src={details?.image}
          alt={details?.name}
        />
        <p className="text text_type_main-medium pt-4">{details?.name}</p>
        <ul className={styles.compound + ` pt-8`}>
          <li className={styles.compoundBlock}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <span className="text text_type_digits-delfaut text_color_inactive">
              {details?.calories}
            </span>
          </li>
          <li className={styles.compoundBlock}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г
            </p>
            <span className="text text_type_digits-delfaut text_color_inactive">
              {details?.proteins}
            </span>
          </li>
          <li className={styles.compoundBlock}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г
            </p>
            <span className="text text_type_digits-delfaut text_color_inactive">
              {details?.fat}
            </span>
          </li>
          <li className={styles.compoundBlock}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <span className="text text_type_digits-delfaut text_color_inactive">
              {details?.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngridientDetails;
