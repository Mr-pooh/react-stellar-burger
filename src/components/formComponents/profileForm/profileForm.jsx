import React, { useState } from 'react';
import styles from '../form.module.css'
import { Button, PasswordInput, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function ProfileForm(){

    const user = useSelector(store => store.user.user)

    console.log(user)

    const [valuePassword, setValuePassword] = React.useState('')
    const onChangePassword = e => {
        setValuePassword(e.target.value)
    }

    const [value, setValue] = React.useState(user.email)
    const onChange = e => {
      setValue(e.target.value)
    }

    const [valueName, setValueName] = React.useState(user.name)
    const onChangeName = e => {
        setValueName(e.target.value)
        
    }

    
    const inputRef = React.useRef(null)
    

    const onIconClick = () => {  
      setTimeout(() => inputRef.current.focus(), 0)
      onFocus()
      
    }

    

    const onBlur = () => {
      
        inputRef.current.disabled = true
        inputRef.current.classList.add('input__textfield-disabled')  
      
    }

    const onFocus= () => {
      inputRef.current.disabled = false;
      inputRef.current.classList.remove('input__textfield-disabled')
    }



    return (
        
            <form className={styles.form}>
                <Input
                    ref={inputRef}
                    type='text'
                    name={'name'}
                    value={valueName}
                    onChange={onChangeName}
                    onIconClick={onIconClick}  
                    placeholder={'Имя'} 
                    icon='EditIcon'
                    size={'default'}
                    disabled={true}
                    onBlur={onBlur}
                />
                <EmailInput
                  onChange={onChange}
                  value={value}
                  name={'email'}
                  placeholder="Логин"
                  isIcon={true}
                />
                <PasswordInput
                  onChange={onChangePassword}
                  value={valuePassword}
                  name={'password'}
                  icon="EditIcon"
                />
            </form>

    )
}

export default ProfileForm