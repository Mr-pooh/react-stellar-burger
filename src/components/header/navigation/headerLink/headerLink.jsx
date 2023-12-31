import { useLocation } from "react-router-dom";
import styles from "../navigation.module.css";

import PropTypes from "prop-types";

export default function HeaderLink({ text, icon, nav, iconFalse }) {
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
}

HeaderLink.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
  nav: PropTypes.string.isRequired,
  iconFalse: PropTypes.object.isRequired
};
