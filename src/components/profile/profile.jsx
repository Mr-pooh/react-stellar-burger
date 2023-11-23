import React from "react";
import styles from './profile.module.css'
import {  NavLink } from "react-router-dom";
import ProfileForm from "../formComponents/profileForm/profileForm";

function Profile(){
    return (
        <div className={styles.container}>
            <ul className={styles.menu}>
                <li className={styles.text + ` text text_type_main-medium`}><NavLink to='/profile' className={styles.link} style={({isActive}) => {
                    return {
                        color: isActive && `#F2F2F3`
                    }
                }}>Профиль</NavLink></li>
                <li className={styles.text + ` text text_type_main-medium`}><NavLink to='/profile/orders' className={styles.link}  style={({isActive}) => {
                    return {
                        color: isActive && `#F2F2F3`
                    }
                }}>История заказов</NavLink></li>
                <li className={styles.text + ` text text_type_main-medium`}><NavLink to='/profile/orders/:id' className={styles.link}  style={({isActive}) => {
                    return {
                        color: isActive && `#F2F2F3`
                    }
                }}>Выход</NavLink></li>
                <p className={styles.textDark + ` text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </ul>
            <ProfileForm />
        </div>
    )
}

export default Profile