import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ProfileForm from "../formComponents/profileForm/profileForm";
import { useDispatch, useSelector } from "react-redux";
import { connectProfile, logout } from "../../services/actions";
import React from "react";
import { ORDERS_PROFILE_SERVER_URL } from "../../utils/wsUtil";
import { getStoreProfileOrders } from "../../services/ordersProfileReducer";

function Profile() {
  const dispatch = useDispatch();

  
  const { statusProfile } = useSelector(getStoreProfileOrders);

  const location = useLocation();

  const onClick = () => {
    dispatch(logout());
  };
  
  const accessToken =
    localStorage.getItem("accessToken") &&
    localStorage.getItem("accessToken").replace(/Bearer /, "");


  React.useEffect(()=>{
    if (
      location.pathname === '/profile/orders' &&
      statusProfile !== "ONLINE" &&
      statusProfile !== "CONNECTING..."
    ) {
      dispatch(
        connectProfile(`${ORDERS_PROFILE_SERVER_URL}?token=${accessToken}`)
      );
    }
  }, [location, accessToken, dispatch, statusProfile])

  return (
    <section className={styles.container}>
      <ul className={styles.menu}>
        <li className={styles.text + ` text text_type_main-medium`}>
          <NavLink
            to="/profile"
            className={styles.link}
            style={({ isActive }) => {
              return {
                color: isActive && `#F2F2F3`,
                cursor: isActive && `default`,
              };
            }}
            end
          >
            Профиль
          </NavLink>
        </li>
        <li className={styles.text + ` text text_type_main-medium`}>
          <NavLink
            to="/profile/orders"
            className={styles.link}
            style={({ isActive }) => {
              return {
                color: isActive && `#F2F2F3`,
                cursor: isActive && `default`,
              };
            }}
          >
            История заказов
          </NavLink>
        </li>
        <li
          className={`${styles.text}  ${styles.logout} text text_type_main-medium text_color_inactive`}
          onClick={onClick}
        >
          Выход
        </li>
        <p
          className={
            styles.textDark + ` text text_type_main-default text_color_inactive`
          }
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </ul>
      {location.pathname === "/profile" ? <ProfileForm /> : <Outlet />}
    </section>
  );
}

export default Profile;
