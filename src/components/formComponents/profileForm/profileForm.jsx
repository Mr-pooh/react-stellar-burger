import React, { useState } from "react";
import styles from "../form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../useForm/useForm";
import { patchUser } from "../../../services/actions";

function ProfileForm() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.user);
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    setValues({
      name: user.name,
      email: user.email,
      password: "",
    });
  }, [setValues, user]);

  const [activeButton, setActiveButton] = useState(false);

  const onChange = (e) => {
    setActiveButton(true);
    handleChange(e);
  };

  const inputRef = React.useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    onFocus();
  };

  const onBlur = () => {
    inputRef.current.disabled = true;
    inputRef.current.classList.add("input__textfield-disabled");
  };

  const onFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.classList.remove("input__textfield-disabled");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(patchUser(values));
    setActiveButton(false);
  };

  const onReset = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      name: user.name,
      email: user.email,
    });
    setActiveButton(false);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
      <Input
        ref={inputRef}
        type="text"
        name={"name"}
        value={values.name}
        onChange={onChange}
        onIconClick={onIconClick}
        placeholder={"Имя"}
        icon="EditIcon"
        size={"default"}
        disabled={true}
        onBlur={onBlur}
        autoComplete="on"
      />
      <EmailInput
        onChange={onChange}
        value={values.email}
        name={"email"}
        placeholder="Логин"
        isIcon={true}
        autoComplete="on"
      />
      <PasswordInput
        onChange={onChange}
        value={values.password}
        name={"password"}
        icon="EditIcon"
      />
      {activeButton && (
        <div className={styles.containerButton}>
          <Button htmlType="reset" type="secondary" size="medium">
            Отменить
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}

export default ProfileForm;
