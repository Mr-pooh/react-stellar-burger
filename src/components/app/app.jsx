import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import { getIngridient } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';
import { initialIngridient } from '../services/initialSlice'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


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
        <AppHeader />
      	<main className={styles.main} >
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor /> 
          </DndProvider>
        </main> 
      </pre>
    </div>
  );
}

export default App;
