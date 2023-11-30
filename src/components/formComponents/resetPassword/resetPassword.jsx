import styles from "../form.module.css";
import {
  Button,
  PasswordInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "../../useForm/useForm";
import { getResetPassword } from "../../../utils/auth";

function ResetPassword() {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({ password: "", token: "" });

  const onChange = (e) => {
    handleChange(e);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (values.password !== "" && values.token !== "") {
      getResetPassword(values)
        .then((res) => {
          localStorage.removeItem("resetPass");
        })
        .then(() => navigate("/login"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {localStorage.getItem("resetPass") ? (
        <form className={styles.form} onSubmit={onSubmit}>
          <h1 className={styles.title + ` text text_type_main-large`}>
            Восстановление пароля
          </h1>
          <PasswordInput
            onChange={onChange}
            value={values.password}
            name={"password"}
            extraClass="mb-2"
            placeholder={"Введите новый пароль"}
          />
          <Input
            name={"token"}
            value={values.token}
            onChange={onChange}
            placeholder={"Введите код из письма"}
            autoComplete="off"
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
          <div className={styles.text}>
            <p className={`text text_type_main-default text_color_inactive`}>
              Вспомнили пароль?
              <Link to={"/login"} className={styles.link}>
                Войти
              </Link>
            </p>
          </div>
        </form>
      ) : (
        <Navigate to="/login"></Navigate>
      )}
    </>
  );
}

export default ResetPassword;
