import styles from "./header.module.css";
import Navigation from "./navigation/navigation.jsx";


export default function AppHeader() {
    return (
        <header className={styles.header}>
            <Navigation />
        </header>
      );
}