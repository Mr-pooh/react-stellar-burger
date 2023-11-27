import React from 'react';
import styles from "./app.module.css";
import  AppHeader  from "../header/header";
import { useDispatch } from 'react-redux';
import { checkUserAuth, initialIngridient } from '../services/actions'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import HomePage from '../../pages/home';
import IngridientDetails from '../ingredientDetails/ingridientDetails';
import Modal from '../modal/modal';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPasswordPage from '../../pages/forgot-password';
import ResetPasswordPage from '../../pages/reset-password';
import ProfilePage from '../../pages/profile';
import NonFound404 from '../../pages/notFound404';
import { OnlyAuth, OnlyUnAuth } from '../services/ProtectedRouteElement';


function App() {

  const dispatch = useDispatch();
  
  React.useEffect(()=> {
    dispatch(initialIngridient())
  }, []);

  React.useEffect(()=> {
    dispatch(checkUserAuth())
  }, [checkUserAuth])


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
            <Route path='/login' element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path='/register' element={<OnlyUnAuth component={<RegisterPage />} />} />
            <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
            <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
            <Route path='/profile' element={<OnlyAuth component={<ProfilePage />} />} />
            <Route path='/ingredients/:id' element={<IngridientDetails />} />
            <Route path='*' element={<NonFound404 />} />
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
