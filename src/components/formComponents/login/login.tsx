import { ChangeEvent, FC, FormEventHandler } from "react";
import styles from "../form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { login } from "../../../services/actions";
import { useAppDispatch, useForm } from "../../../utils/hooks";

const Login: FC = () => {
  const dispatch = useAppDispatch();

  const { values, handleChange } = useForm({ email: "", password: "" });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h1 className={styles.title + ` text text_type_main-large`}>Вход</h1>
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        isIcon={false}
        autoComplete="on"
      />
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={"password"}
        extraClass="mb-2"
      />
      <Button htmlType="submit" type="primary" size="medium">
        Войти
      </Button>
      <div className={styles.text}>
        <p className={`text text_type_main-default text_color_inactive`}>
          Вы — новый пользователь?
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className={`text text_type_main-default text_color_inactive`}>
          Забыли пароль?
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
