import styles from "./app.module.css";
import { data } from "../../utils/data";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";

function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
        <AppHeader />
      	<main >
          <BurgerIngridients data={data} />
          
        </main>
      </pre>
    </div>
  );
}

export default App;
