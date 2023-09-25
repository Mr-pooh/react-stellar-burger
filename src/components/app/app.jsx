import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import { getIngridient } from '../../utils/burger-api';

function App() {
  
  const [appState, setAppState] = React.useState({
    loading: false,
    hasError: false,
    data: []
  })

  React.useEffect(()=> {

    const apiInitial = () => {
      setAppState({ ...appState, loading: true, hasError: false });
      getIngridient()
        .then((res) => {
          setAppState({
            ...appState,
            loading: false,
            data: res.data
          })})
        .catch((err) => {
            setAppState({
              ...appState,
              hasError: true,
              loading: false
            })
            console.log(err)
          })
        }
      
    apiInitial()
  }, [])

  const {data, isLoading, hasError} = appState;

  return (
    <div className={styles.app}>
      <pre className={styles.pre}>

      {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          data.length &&
          <>
            <AppHeader />
      	    <main className={styles.main} >
              <BurgerIngridients data={data}   />
              <BurgerConstructor data={data} />
            </main>
          </>
        }
      </pre>
    </div>
  );
}

export default App;
