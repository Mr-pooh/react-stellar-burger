import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/actions';


function Login(){

  const dispatch = useDispatch();

    const [password, setPassword] = React.useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const [email, setEmail] = React.useState('')
    const onChange = e => {
      setEmail(e.target.value)
    }

    const onClick = () => {
      dispatch(login({email, password}))
    }

    return (
        
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Вход</h1>
                <EmailInput
                  onChange={onChange}
                  value={email}
                  name={'email'}
                  isIcon={false}
                />
                <PasswordInput
                  onChange={onChangePassword}
                  value={password}
                  name={'password'}
                  extraClass="mb-2"
                />
                <Button htmlType="button" type="primary" size="medium" onClick={onClick}>Войти</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вы — новый пользователь?<Link to={'/register'} className={styles.link} >Зарегистрироваться</Link></p>
                    <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль?<Link to={'/forgot-password'} className={styles.link} >Восстановить пароль</Link></p>
                </div>
            </form>

    )
}

export default Login