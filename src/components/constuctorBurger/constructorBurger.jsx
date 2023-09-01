import React from 'react';
import styles from './constructorBurger.module.css';

import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import SelectedElement from './selectedElement/selectedElement';




export default function BurgerConstructor({data}) {


    

    return (
        <section className={styles.constructorBurger + ` text pt-25 ml-10`}>
   
                <div className='pl-4' style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: 'inherit' }}  >
                    <div className={styles.list + ` text ml-8`}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text="Краторная булка N-200i (верх)"
                            price={200}
                            thumbnail={''}
                        />
                    </div>
                    <div className={styles.ingridientsSelect + ` custom-scroll`}>
                        <SelectedElement data={data} />
                    </div>
                    <div className={styles.list + ` text ml-8`}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text="Краторная булка N-200i (низ)"
                            price={200}
                            thumbnail={''}
                        />
                    </div>
                    <div className={styles.summ + ` mt-10`}>
                        <p className='text text_type_digits-medium pr-10'>610<CurrencyIcon type="primary" /></p>
                        <Button htmlType="button" type="primary" size="medium">
                            Оформить заказ
                        </Button>
                    </div>
                </div>
             
        </section>
    )
}