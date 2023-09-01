import styles from "./app.module.css";
import { data } from "../../utils/data";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';


function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
        <AppHeader />
      	<main className={styles.main} >
          <BurgerIngridients data={data} />
          <BurgerConstructor data={data} />
        </main>
      </pre>
    </div>
  );
}

export default App;
