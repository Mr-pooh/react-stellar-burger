import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';


function Login(){

    const [valuePassword, setValuePassword] = React.useState('password')
    const onChangePassword = e => {
        setValuePassword(e.target.value)
    }

    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }


    return (
        
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Вход</h1>
                <EmailInput
                  onChange={onChange}
                  value={value}
                  name={'email'}
                  isIcon={false}
                />
                <PasswordInput
                  onChange={onChangePassword}
                  value={valuePassword}
                  name={'password'}
                  extraClass="mb-2"
                />
                <Button htmlType="button" type="primary" size="medium" onClick={null}>Войти</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вы — новый пользователь?<Link to={'/'} className={styles.link} >Зарегистрироваться</Link></p>
                    <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль?<Link to={'/'} className={styles.link} >Восстановить пароль</Link></p>
                </div>
            </form>

    )
}

export default Login