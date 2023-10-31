import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import { getIngridient } from '../../utils/burger-api';
import { useDispatch, useSelector } from 'react-redux';
import { cart } from '../services/counterSlice'


function App() {

  // const { wasErr, isLoading, bun, ingridients } = useSelector((store) => ({
  //   wasErr: store.hasError,
  //   isLoading: store.loading,
  //   bun: store.cart.bun,
  //   ingridients: store.counter.cart.ingridients
  
  // }))
  
  const dispatch = useDispatch();
  
  //const { actions } = counterSlice();
  
  console.log(cart)
  // console.log(loading)

  React.useEffect(()=> {

    const apiInitial = () => {
      //dispatch(loading)
      getIngridient()
        .then((res) => {
          dispatch(cart({
            res
          }))})
        .catch((err) => {
          //dispatch(hasError)
            console.log(err)
          })
        }
      
    apiInitial()
  }, [dispatch])

  const { ingridients } = useSelector(state => ({
    ingridients: state.counter.cart.ingridients
  }))
  console.log(ingridients)

  return (
    <div className={styles.app}>
      <pre className={styles.pre}>

         {ingridients.length &&

          <>
            <AppHeader />
      	    <main className={styles.main} >
       
                <BurgerIngridients />
                <BurgerConstructor /> 
     
            </main> 
          </>
           }
      </pre>
    </div>
  );
}

export default App;
