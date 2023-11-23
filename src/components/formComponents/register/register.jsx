import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';


function Register(){

    const [valuePassword, setValuePassword] = React.useState('password')
    const onChangePassword = e => {
        setValuePassword(e.target.value)
    }

    const [value, setValue] = React.useState('bob@example.com')
    const onChange = e => {
      setValue(e.target.value)
    }

    const [valueName, setValueName] = React.useState('')
    const onChangeName = e => {
        setValueName(e.target.value)
    }


    return (
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Регистрация</h1>
                <Input name={'name'} value={valueName} onChange={onChangeName}  placeholder={'Имя'} />
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
                <Button htmlType="button" type="primary" size="medium" onClick={null}>Зарегестрироваться</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Уже зарегистрированы?<Link to={'/'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default Register