import React, { ChangeEvent, FC, FormEventHandler, useState } from "react";
import styles from "../form.module.css";
import {
  Button,
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { patchUser } from "../../../services/actions";
import { useAppDispatch, useAppSelector, useForm } from "../../../utils/hooks";

const ProfileForm: FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((store) => store.user.user);
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    if (user?.name && user?.email) {
      setValues({
        name: user?.name,
        email: user?.email,
        password: "",
      });
    }
  }, [setValues, user]);

  const [activeButton, setActiveButton] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setActiveButton(true);
    handleChange(e);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  const onIconClick = () => {
    setTimeout(
      () => inputRef && inputRef.current && inputRef.current.focus(),
      0
    );
    onFocus();
  };

  const onBlur = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.disabled = true;
      inputRef.current.classList.add("input__textfield-disabled");
    }
  };

  const onFocus = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.classList.remove("input__textfield-disabled");
    }
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(patchUser(values));
    setActiveButton(false);
  };

  const onReset: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (user?.name && user?.email) {
      setValues({
        ...values,
        name: user?.name,
        email: user?.email,
      });
      setActiveButton(false);
    }
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
};

export default ProfileForm;
