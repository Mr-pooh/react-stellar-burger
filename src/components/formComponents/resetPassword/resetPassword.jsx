import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';


function ResetPassword(){

    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePassword = e => {
        setValuePassword(e.target.value)
    }



    const [valueName, setValueName] = React.useState('')
    const onChangeName = e => {
        setValueName(e.target.value)
    }


    return (
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Восстановление пароля</h1>
                <PasswordInput
                  onChange={onChangePassword}
                  value={valuePassword}
                  name={'password'}
                  extraClass="mb-2"
                  placeholder={'Введите новый пароль'}
                />
                <Input name={'name'} value={valueName} onChange={onChangeName}  placeholder={'Введите код из письма'} />
                <Button htmlType="button" type="primary" size="medium" onClick={null}>Сохранить</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль?<Link to={'/login'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default ResetPassword