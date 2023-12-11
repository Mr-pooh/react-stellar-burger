import React from "react";
import styles from "./app.module.css";
import AppHeader from "../header/header";
import { useDispatch } from "react-redux";
import {
  checkUserAuth,
  disconnect,
  connect,
  initialIngridient,
} from "../../services/actions";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import HomePage from "../../pages/home";
import IngridientDetails from "../ingredientDetails/ingridientDetails";
import Modal from "../modal/modal";
import LoginPage from "../../pages/login";
import RegisterPage from "../../pages/register";
import ForgotPasswordPage from "../../pages/forgot-password";
import ResetPasswordPage from "../../pages/reset-password";
import ProfilePage from "../../pages/profile";
import NonFound404 from "../../pages/notFound404";
import { OnlyAuth, OnlyUnAuth } from "../../services/ProtectedRouteElement";
import FeedPage from "../../pages/feed";
import { ORDERS_ALL_SERVER_URL } from "../../utils/wsUtil";
import OrderInfoDetails from "../orderInfoDetails/orderInfoDetails";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initialIngridient());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname !== "/reset-password") {
      localStorage.removeItem("resetPass");
    }
    if(location.pathname === `/feed`){
      dispatch(connect(ORDERS_ALL_SERVER_URL))
    }
    if (location.pathname !== `/feed`) {
      dispatch(disconnect(ORDERS_ALL_SERVER_URL));
    }
  }, [dispatch, location]);

  
  console.log(location)

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
        <main className={styles.main}>
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/feed" element={<FeedPage />} />
            <Route
              path="/login"
              element={<OnlyUnAuth component={<LoginPage />} />}
            />
            <Route
              path="/register"
              element={<OnlyUnAuth component={<RegisterPage />} />}
            />
            <Route
              path="/forgot-password"
              element={<OnlyUnAuth component={<ForgotPasswordPage />} />}
            />
            <Route
              path="/reset-password"
              element={<OnlyUnAuth component={<ResetPasswordPage />} />}
            />
            <Route
              path="/profile"
              element={<OnlyAuth component={<ProfilePage />} />}
            />
            <Route path="/ingredients/:id" element={<IngridientDetails />} />
            <Route path="/feed/:number" element={<OrderInfoDetails />} />
            <Route path="*" element={<NonFound404 />} />
          </Routes>
          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal onClose={handleModalClose}>
                    <IngridientDetails />
                  </Modal>
                }
              />
              <Route
                path="/feed/:number"
                element={
                  <Modal onClose={handleModalClose}>
                    <OrderInfoDetails />
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
