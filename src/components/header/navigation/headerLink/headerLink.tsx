import { useLocation } from "react-router-dom";
import styles from "../navigation.module.css";
import { FC, ReactNode } from "react";

interface IHeaderLink {
  text: string;
  icon: ReactNode;
  nav: string;
  iconFalse: ReactNode;
}

const HeaderLink: FC<IHeaderLink> = ({ text, icon, nav, iconFalse }) => {
  const { pathname } = useLocation();

  return (
    <div className={styles.headerLink + `  p-5`}>
      {pathname === nav ? icon : iconFalse}
      <p
        className={
          pathname === nav
            ? "p-2 text text_type_main-default"
            : "p-2 text text_type_main-default text_color_inactive"
        }
      >
        {text}
      </p>
    </div>
  );
};

export default HeaderLink;
