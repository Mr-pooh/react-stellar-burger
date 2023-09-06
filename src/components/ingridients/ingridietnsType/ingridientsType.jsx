import React from 'react';
import styles from '../ingridients.module.css';
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngridientsType ({item, openModal}) {

    return (
        <li className={styles.elem + ` mt-6`} onClick={openModal}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={item.image} className='pl-4 pr-4'/>
            <div className={styles.price}>
                <h4 className='text text_type_digits-default p-1'>{item.price}</h4>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.custom_text+' text text_type_main-default'}>{item.name}</p>
        </li>
    )
}

IngridientsType.propTypes = {
    item: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired
}