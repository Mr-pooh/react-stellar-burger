import React from 'react';
import styles from '../form.module.css'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';


function ForgotPassword(){


    const [value, setValue] = React.useState('')
    const onChange = e => {
      setValue(e.target.value)
    }


    return (
            <form className={styles.form}>
                <h1 className={styles.title + ` text text_type_main-large`}>Восстановление пароля</h1>
                <EmailInput
                  onChange={onChange}
                  value={value}
                  name={'email'}
                  isIcon={false}
                  placeholder={'Укажите e-mail'}
                />
                <Button htmlType="button" type="primary" size="medium" onClick={null}>Восстановить</Button>
                <div className={styles.text}>
                    <p className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль?<Link to={'/'} className={styles.link} >Войти</Link></p>
                </div>
            </form>

    )
}

export default ForgotPassword