import React from 'react';

import { api } from '../../utils/api';

import styles from "./app.module.css";



import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import Modal from '../modal/modal';


function App() {
  
  
  const [appState, setAppState] = React.useState({
    loading: false,
    hasError: false,
    data: []
  })

  React.useEffect(()=> {

    const apiInitial = () => {

      setAppState({ ...appState, loading: true, hasError: false });
      fetch(api)
        .then(res => res.json())
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
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>

      {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading &&
          !hasError &&
          data.length &&
          <>
            <AppHeader />
      	    <main className={styles.main} >
              <BurgerIngridients data={data} />
              <BurgerConstructor data={data} />
            </main>
           <Modal />
          </>
        }
      </pre>
    </div>
  );
}

export default App;
