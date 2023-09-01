import React from 'react';
import styles from '../constructorBurger.module.css';

import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';


export default function SelectedElement({data}) {

    const constructElements = data.map((item) =>{
        return (
            <div className={styles.itemSelect} key={item._id}>
                <DragIcon type="primary" />

                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                />
            </div>
        )
    })

    return (

            constructElements
       
    )
}