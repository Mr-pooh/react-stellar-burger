import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import { useDispatch } from 'react-redux';
import { initialIngridient } from '../services/initialSlice'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import HomePage from '../../pages/home';
import IngridientDetails from '../ingredientDetails/ingridientDetails';
import Modal from '../modal/modal';


function App() {

  const dispatch = useDispatch();
  
  React.useEffect(()=> {
    dispatch(initialIngridient())
  }, [dispatch]);


  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };


  return (
    
    <div className={styles.app}>
      <pre className={styles.pre}>
        <AppHeader />
      	<main className={styles.main} >
          <Routes location={background || location}>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={null} />
            <Route path='/register' element={null} />
            <Route path='/forgot-password' element={null} />
            <Route path='/reset-password' element={null} />
            <Route path='/profile' element={null} />
            <Route path='/ingredients/:id' element={<IngridientDetails />} />
            <Route path='*' element={null} />
          </Routes>
          {background && (
            <Routes>
	            <Route
	              path='/ingredients/:id'
	              element={
	                <Modal onClose={handleModalClose}>
	                  <IngridientDetails />
	                </Modal>
	              }
	            />
            </Routes>
          )}
        </main> 
      </pre>
    </div>

  );
}

export default App;
