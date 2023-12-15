import React from "react";
import styles from "./app.module.css";
import AppHeader from "../header/header";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserAuth,
  disconnect,
  initialIngridient,
  disconnectProfile,
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
import OrderInfoDetails from "../orderInfoDetails/orderInfoDetails";
import { getStoreAllOrders } from "../../services/ordersReducer";
import Orders from "../orders/orders";
import { getStoreProfileOrders } from "../../services/ordersProfileReducer";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initialIngridient());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();

  const patternAll = React.useMemo(() => /^[/]feed/, []);

  const patternPerson = React.useMemo(() => /^[/]profile[/]orders/, []);

  const { status } = useSelector(getStoreAllOrders);

  const { statusProfile } = useSelector(getStoreProfileOrders);

  React.useEffect(() => {
    if (location.pathname !== "/reset-password") {
      localStorage.removeItem("resetPass");
    }
    if (!location.pathname.match(patternAll) && status !== "OFFLINE") {
      dispatch(disconnect());
    }
    if (
      !location.pathname.match(patternPerson) &&
      statusProfile !== "OFFLINE"
    ) {
      dispatch(disconnectProfile());
    }
  }, [dispatch, location, status, patternAll, patternPerson, statusProfile]);

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
            <Route path="/feed" element={<FeedPage />} />
            <Route
              path="/profile"
              element={<OnlyAuth component={<ProfilePage />} />}
            >
              <Route
                path="/profile/orders"
                element={<OnlyAuth component={<Orders />} />}
              />
            </Route>
            <Route path="/ingredients/:id" element={<IngridientDetails />} />
            <Route path="/feed/:number" element={<OrderInfoDetails />} />
            <Route
              path="/profile/orders/:number"
              element={<OnlyAuth component={<OrderInfoDetails />} />}
            />
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
              <Route
                path="/profile/orders/:number"
                element={
                  <OnlyAuth
                    component={
                      <Modal onClose={handleModalClose}>
                        <OrderInfoDetails />
                      </Modal>
                    }
                  />
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
