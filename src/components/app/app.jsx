import React from 'react';
import { api } from '../../utils/api';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import BurgerIngridients from "../ingridients/ingridients";
import BurgerConstructor from '../constuctorBurger/constructorBurger';
import Modal from '../modal/modal';
import OrderDetails from '../orderDetails/orderDetails';
import IngridientDetails from '../ingredientDetails/ingridientDetails';
import IngridientsType from '../ingridients/ingridietnsType/ingridientsType'


function App() {
  
  const [modalActive, setModalActive] = React.useState({
    active: false,
    elem: null
  })
  
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
  
  const onClose = () => {
    setModalActive({
      active: false,
      elem: null
    })
  }
  
  const openModal = (id) => {
    const element = data.find((item) => {
      if(item._id === id){
        return item
      }
    })

    setModalActive({
      active: true,
      elem: element
    })
  }
  
  const { elem, active } = modalActive;

  React.useEffect(()=> {
    document.addEventListener('click', openModal);
    return(
      document.removeEventListener('click', openModal)
    )
  })

  React.useEffect(()=> {
    document.addEventListener('click', onClose);
    return(
      document.removeEventListener('click', onClose)
    )
  })

  const elementBun = type => data.map((item) => {
    return (
      (item.type === type) &&
        <IngridientsType item={item} type={type} openModal={()=>openModal(item._id)} key={item._id} />
    )
  }); 


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
              <BurgerIngridients data={data} openModal={openModal} elementBun={elementBun}  />
              <BurgerConstructor data={data} openModal={openModal} />
            </main>
            {active &&
              <Modal onClose={onClose} >
                {elem ?
                <IngridientDetails element={elem} />
                :
                <OrderDetails />}
              </Modal>
            }  
          </>
        }
      </pre>
    </div>
  );
}

export default App;
