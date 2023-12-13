import styles from "./profile.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import ProfileForm from "../formComponents/profileForm/profileForm";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions";

function Profile() {
  const dispatch = useDispatch();

  const location = useLocation();

  const onClick = () => {
    dispatch(logout());
  };

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
