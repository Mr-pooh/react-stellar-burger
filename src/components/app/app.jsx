import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import { getIngridient } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';
import { initialIngridient } from '../services/initialSlice'


function App() {

  const dispatch = useDispatch();
  
  React.useEffect(()=> {
    dispatch(initialIngridient())
  }, [dispatch])

  // const { bun } = useSelector(state => ({
  //   bun: state.initial.cart.bun
  // }))
  // console.log(bun)

  return (
    <div className={styles.app}>
      <pre className={styles.pre}>

        

          <>
            <AppHeader />
      	    <main className={styles.main} >
       
                <BurgerIngridients />
                <BurgerConstructor /> 
     
            </main> 
          </>
           
      </pre>
    </div>
  );
}

export default App;
