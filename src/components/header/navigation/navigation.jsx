import styles from './navigation.module.css'

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderLink from './headerLink/headerLink.jsx'
import { Link } from "react-router-dom";

export default function Navigation() {
    return (
        <nav className={styles.navigation + ' p-4'}>
            <div className="headerLink">
                <Link to='/' className={styles.link}><HeaderLink text='Конструктор' active={true} icon={<BurgerIcon type="primary" />} /></Link>
                <Link  className={styles.link}><HeaderLink text='Лента заказов' icon={<ListIcon type="secondary" />} /></Link>
            </div>
            <Logo  />

            <Link to='/profile' className={styles.link}><HeaderLink text='Личный кабинет' icon={<ProfileIcon type="secondary" />} /></Link>
        </nav>

    )
}