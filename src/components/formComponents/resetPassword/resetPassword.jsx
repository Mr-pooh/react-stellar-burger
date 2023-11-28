import React from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../useForm/useForm';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../services/actions';


function ResetPassword(){

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const { values, handleChange } = useForm({ password: '', token: ''});
   

   const onChange = (e) => {
        handleChange(e)
   }

   const onSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(values, navigate('/login', {replace: true})))
    
   }


    return (
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.title + ` text text_type_main-large`}>Восстановление пароля</h1>
                <PasswordInput
                  onChange={onChange}
                  value={values.password}
                  name={'password'}
                  extraClass="mb-2"
                  placeholder={'Введите новый пароль'}
                />
                <Input name={'token'} value={values.token} onChange={onChange}  placeholder={'Введите код из письма'} />
                <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль?<Link to={'/login'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default ResetPassword