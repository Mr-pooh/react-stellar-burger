import styles from "./navigation.module.css";

import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import HeaderLink from "./headerLink/headerLink";
import { NavLink } from "react-router-dom";
import { FC } from "react";

const Navigation: FC = () => {
  return (
    <nav className={styles.navigation + " p-4"}>
      <div className={styles.headerLink}>
        <NavLink to="/" className={styles.link}>
          <HeaderLink
            text="Конструктор"
            icon={<BurgerIcon type="primary" />}
            iconFalse={<BurgerIcon type="secondary" />}
            nav={"/"}
          />
        </NavLink>
        <NavLink to="/feed" className={styles.link}>
          <HeaderLink
            text="Лента заказов"
            icon={<ListIcon type="primary" />}
            iconFalse={<ListIcon type="secondary" />}
            nav={"/feed"}
          />
        </NavLink>
      </div>
      <Logo />

      <NavLink to="/profile" className={styles.link}>
        <HeaderLink
          text="Личный кабинет"
          icon={<ProfileIcon type="primary" />}
          iconFalse={<ProfileIcon type="secondary" />}
          nav={"/profile"}
        />
      </NavLink>
    </nav>
  );
};

export default Navigation;
