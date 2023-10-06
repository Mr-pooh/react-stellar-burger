import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../../utils/prop-types.js';
import styles from '../constructorBurger.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function SelectedElement({data}) {

    const constructElements = data.map((item, index) =>{
        return (
            <div className={styles.itemSelect} key={item._id + index}>
                <DragIcon type="primary" />
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image}/>
            </div>
        )
    })
    return (
            constructElements
    )
}

SelectedElement.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
}