import React from 'react'
import styles from "./ingridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components"

import IngridientsType from './ingridietnsType/ingridientsType';


export default function BurgerIngridients({data}) {
    const [current, setCurrent] = React.useState('Булки')

    return (
          
            <section className={styles.ingridients}>
                <h1 className="text text_type_main-large pt-10 pd-5">Соберите бургер</h1>
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
                <div className={styles.tableIngridients + ' custom-scroll'}>
                  <h3 className='text text_type_main-medium pt-10'>Булки</h3>
                  <IngridientsType elements={data} style={styles} type={'bun'} />
                  <h3 className='text text_type_main-medium pt-10'>Соусы</h3>
                  <IngridientsType elements={data} style={styles} type={'sauce'} />
                  <h3 className='text text_type_main-medium pt-10'>Начинки</h3>
                  <IngridientsType elements={data} style={styles} type={'main'} />
                </div>
            </section>
        
      );
}