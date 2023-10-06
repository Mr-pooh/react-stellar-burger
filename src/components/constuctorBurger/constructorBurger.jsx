import React from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../utils/prop-types.js';
import styles from './constructorBurger.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SelectedElement from './selectedElement/selectedElement';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../orderDetails/orderDetails.jsx';
import { BurgerConstructorContext } from '../services/burgerConstructorContext.jsx';
import { BurgerIngridientsContext } from '../services/burgerIngridientsContext.jsx';


const startSumm = {price: 0}

const reducer = (state, summ) => {
    switch(summ.type){
        case state.bun:
            return {price: 2 * state.price};
        case state.ingridients:
            summ.ingridients.map((item)=> {
                return {price: item + state.price}

            })
    }
}

export default function BurgerConstructor() {

    const {elemConstr} = React.useContext(BurgerConstructorContext)
    
    const [modalActive, setModalActive] = React.useState(false)

    const [stater, dispatch] = React.useReducer(reducer, startSumm)
    
    const open = () => {
       setModalActive(true);
       dispatch(elemConstr)
    }
    console.log()

    const onClose = () => {
        setModalActive(false)
    }

    React.useEffect(() => {
        return () => {
            document.removeEventListener('click',onClose)
        }
    })

   
    

    console.log(elemConstr)

    return (
        <section className={styles.constructorBurger + ` text pt-25 ml-10`}>
            <div className={styles.constructorItems + ' pl-4'}>
                <div className={styles.list + ` text ml-8`}>
                    {elemConstr.bun &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={elemConstr.bun.name + ` (верх)`}
                            price={elemConstr.bun.price}
                            thumbnail={elemConstr.bun.image}
                        />
                    }
                </div>
                <div className={styles.ingridientsSelect + ` custom-scroll`}>
                    <SelectedElement data={elemConstr.ingridients} />
                </div>
                <div className={styles.list + ` text ml-8`}>
                    {elemConstr.bun &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={elemConstr.bun.name + ` (низ)`}
                            price={elemConstr.bun.price}
                            thumbnail={elemConstr.bun.image}
                        />
                    }
                </div>
                <div className={styles.summ + ` mt-10`}>
                    <p className='text text_type_digits-medium pr-10'>0<CurrencyIcon type="primary" /></p>
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
//
//BurgerConstructor.propTypes = {
//    data: PropTypes.arrayOf(ingredientPropType).isRequired
//}
