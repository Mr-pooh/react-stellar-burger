import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions';


function Register(){

  const dispatch = useDispatch()

    const [password, setPassword] = React.useState('')
    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const [email, setEmail] = React.useState('')
    const onChange = e => {
      setEmail(e.target.value)
    }

    const [name, setName] = React.useState('')
    const onChangeName = e => {
        setName(e.target.value)
    }


    const onClick = () => {
      if(name !== '' && email !== '' && password !== ''){
        dispatch(register({name, email, password}))
      }

    }

  

    return (
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Регистрация</h1>
                <Input name={'name'} value={name} onChange={onChangeName}  placeholder={'Имя'} />
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
                <Button htmlType="button" type="primary" size="medium" onClick={onClick}>Зарегестрироваться</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Уже зарегистрированы?<Link to={'/login'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default Register