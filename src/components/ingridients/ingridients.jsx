import React, { useEffect } from 'react';
import styles from "./ingridients.module.css";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientsType from './ingridietnsType/ingridientsType';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

export default function BurgerIngridients() {

  const { cart } = useSelector((store) => ({
    cart: store.initial.data
  }))
 
  const [current, setCurrent] = React.useState('Булки');

  const [bunRef, bunsInView] = useInView({threshold: 0});
  const [sauceRef, saucesInView] = useInView({threshold: 0});
  const [mainRef, mainsInView] = useInView({threshold: 0});


    useEffect(() => {
        if (bunsInView) {
            setCurrent('bun')
        } else if (saucesInView) {
            setCurrent('sauce')
        } else {
            setCurrent('main')
        }
    }, [bunsInView, saucesInView, mainsInView]);

    const handleTubClick = (type) => {
      setCurrent(type);
      const element = document.getElementById(type) 
      element && element.scrollIntoView({behavior: 'smooth'})
  }
    

    const elementIngridient = (type) => cart.map(item => {
      if(item.type === type)
        return(
          <IngridientsType item={item} key={item._id} />
        )
    })

    return (
            <section className={styles.ingridients}>
                <h1 className="text text_type_main-large pt-10 pd-5">Соберите бургер</h1>
                <div style={{ display: 'flex' }} >
                  <Tab value="Булки" active={current === 'bun'} onClick={() => handleTubClick('bun')}>
                    Булки
                  </Tab>
                  <Tab value="Соусы" active={current === 'sauce'} onClick={() => handleTubClick('sauce')}>
                    Соусы
                  </Tab>
                  <Tab value="Начинки" active={current === 'main'} onClick={() => handleTubClick('main')}>
                    Начинки
                  </Tab>
                </div>
                <div className={styles.tableIngridients + ' custom-scroll'} > 
                  <h3 className='text text_type_main-medium pt-10' >Булки</h3>
                  <ul className={styles.table} id={'bun'} ref={bunRef}>
                    {elementIngridient('bun')}
                  </ul>
                  <h3 className='text text_type_main-medium pt-10' >Соусы</h3>
                  <ul className={styles.table} id={'sauce'} ref={sauceRef}>
                    {elementIngridient('sauce')}
                  </ul>
                  <h3 className='text text_type_main-medium pt-10'>Начинки</h3>
                  <ul className={styles.table} id={'main'} ref={mainRef}>
                    {elementIngridient('main')}
                  </ul>
                </div>
            </section>
      );
}