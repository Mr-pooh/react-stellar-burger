import React from 'react';
import PropTypes from 'prop-types';
import styles from "./ingridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsType from './ingridietnsType/ingridientsType';
import { ingredientPropType } from '../../utils/prop-types';

export default function BurgerIngridients({data}) {
    const [current, setCurrent] = React.useState('Булки');

    const elementBun = type => data.map(item => {
      return(     
        (item.type === type) &&
        <IngridientsType item={item} key={item._id} />
      )
    })
    

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
                  <ul className={styles.table}>
                    {elementBun('bun')}
                  </ul>
                  <h3 className='text text_type_main-medium pt-10'>Соусы</h3>
                  <ul className={styles.table}>
                    {elementBun('sauce')}
                  </ul>
                  <h3 className='text text_type_main-medium pt-10'>Начинки</h3>
                  <ul className={styles.table}>
                    {elementBun('main')}
                  </ul>
                </div>
            </section>
      );
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired
}
