import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types.js';
import styles from './constructorBurger.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SelectedElement from './selectedElement/selectedElement';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../orderDetails/orderDetails.jsx';

export default function BurgerConstructor({data}) {

    const [modalActive, setModalActive] = React.useState(false)
    
    const open = () => {
       setModalActive(true)
    }

    const onClose = () => {
        setModalActive(false)
    }

    React.useEffect(() => {
        return () => {
            document.removeEventListener('click',onClose)
        }
    })


    return (
        <section className={styles.constructorBurger + ` text pt-25 ml-10`}>
            <div className={styles.constructorItems + ' pl-4'}>
                <div className={styles.list + ` text ml-8`}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={200}
                        thumbnail={data[0].image}
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
                        thumbnail={data[0].image}
                    />
                </div>
                <div className={styles.summ + ` mt-10`}>
                    <p className='text text_type_digits-medium pr-10'>610<CurrencyIcon type="primary" /></p>
                    <Button htmlType="button" type="primary" size="medium" onClick={open}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {modalActive && 
                <Modal onClose={onClose}><OrderDetails /></Modal>
            }
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(ingredientPropType).isRequired
}
