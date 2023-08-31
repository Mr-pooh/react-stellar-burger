import React from 'react';

import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

export default function IngridientsType ({elements, style, type}) {
    const elementBun = elements.map((item) => {
        if(item.type === type){
        return(
        <li className={style.elem + ` mt-6`} key={item._id}>
            <img src={item.image} className='pl-4 pr-4'/>
            <h4 className='text text_type_digits-default pt-1 pb-1'>{item.price}<CurrencyIcon type="primary" /></h4>
            <p className={style.custom_text+' text text_type_main-default'}>{item.name}</p>
        </li>)}
    });
    


    return (
        <ul className={style.table}>
            {elementBun}
        </ul>
    )
}