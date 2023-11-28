import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions';
import { useForm } from '../../useForm/useForm';


function Register(){

  const dispatch = useDispatch()

  const { values, handleChange } = useForm({ name: '', email: '', password: ''});

    const onChange = (e) => {
      handleChange(e)
    }

    const onSubmit = () => {
      dispatch(register(values))
    }

  

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <h1 className={styles.title + ` text text_type_main-large`}>Регистрация</h1>
            <Input name={'name'} value={values.name} onChange={onChange}  placeholder={'Имя'} />
            <EmailInput
              onChange={onChange}
              value={values.email}
              name={'email'}
              isIcon={false}
            />
            <PasswordInput
              onChange={onChange}
              value={values.password}
              name={'password'}
              extraClass="mb-2"
            />
            <Button htmlType="submit" type="primary" size="medium">Зарегестрироваться</Button>
            <div className={styles.text}>
                <p className={`text text_type_main-default text_color_inactive`}>Уже зарегистрированы?<Link to={'/login'} className={styles.link} >Войти</Link></p>
            </div>
        </form>

    )
}

export default Register