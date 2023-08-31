import React from 'react'
import styles from "./ingridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"

import IngridientsType from './ingridietnsType/ingridientsType';


export default function BurgerIngridients({data}) {
    const [current, setCurrent] = React.useState('Булки')

    return (
          
            <div className={styles.ingridients + ' custom-scroll'}>
                <h1 className="text text_type_main-large">Соберите бургер</h1>
                <div style={{ display: 'flex' }}>
                  <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                    Булки
                  </Tab>
                  <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                    Соусы
                  </Tab>
                  <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                    Начинки
                  </Tab>
                </div>
                <h3 className='text text_type_main-medium'>Булки</h3>
                <IngridientsType elements={data} style={styles} type={'bun'} />
                <h3 className='text text_type_main-medium'>Соусы</h3>
                <IngridientsType elements={data} style={styles} type={'sauce'} />
                <h3 className='text text_type_main-medium'>Начинки</h3>
                <IngridientsType elements={data} style={styles} type={'main'} />
            </div>
        
      );
}