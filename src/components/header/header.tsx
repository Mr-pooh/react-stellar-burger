import { FC } from "react";
import styles from "./header.module.css";
import Navigation from "./navigation/navigation";

const AppHeader: FC = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};

export default AppHeader;
