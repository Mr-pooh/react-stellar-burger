import React from 'react';

import PropTypes from 'prop-types';
import {ingredientPropType} from '../../../utils/prop-types.js';

import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components'

export default function IngridientsType ({elements, style, type}) {
    const elementBun = elements.map((item) => {
        if(item.type === type){
        return(
        <li className={style.elem + ` mt-6`} key={item._id}>
            <Counter count={1} size="default" extraClass="m-1" />
            <img src={item.image} className='pl-4 pr-4'/>
            <div className={style.price}>
                <h4 className='text text_type_digits-default p-1'>{item.price}</h4>
                <CurrencyIcon type="primary" />
            </div>
            <p className={style.custom_text+' text text_type_main-default'}>{item.name}</p>
        </li>)}
    });
    


    return (
        <ul className={style.table}>
            {elementBun}
        </ul>
    )
}

IngridientsType.propTypes = {
    elements: PropTypes.arrayOf(ingredientPropType).isRequired,
    style: PropTypes.object,
    type: PropTypes.string
}