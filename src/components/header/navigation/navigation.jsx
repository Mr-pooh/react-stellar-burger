import "./navigation.css";

import {Logo, BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'

import HeaderLink from './headerLink/headerLink.jsx'

export default function Navigation() {
    return (
        <nav className='navigation p-4'>
            <div className="headerLink">
                <HeaderLink text='Конструктор' active={true} icon={<BurgerIcon type="primary" />} />
                <HeaderLink text='Лента заказов' icon={<ListIcon type="secondary" />} />
            </div>
            <Logo  />

            <HeaderLink text='Личный кабинет' icon={<ProfileIcon type="secondary" />} />
        </nav>

    )
}