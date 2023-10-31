import React from 'react';
import styles from '../ingridients.module.css';
import PropTypes from 'prop-types';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngridientDetails from '../../ingredientDetails/ingridientDetails';
import { useDispatch } from 'react-redux';



export default function IngridientsType ({item}) {

    const [modalOpen, setModalOpen] = React.useState(false);

    //const dispatch = useDispatch();



   
    // const addItemConstruct = () => {
    //     if(item.type === 'bun'){
    //         setElemConstr({
    //             ...elemConstr,
    //             bun: item
    //         })
    //     }
    //     if(item.type !== 'bun'){
    //         setElemConstr({
    //             ...elemConstr,
    //             ingridients: [...elemConstr.ingridients, item]
    //         })
    //     }

    // }

    const open = () => {
        // addItemConstruct();
        setModalOpen(true);
    }

    const onClose = () => {
       setModalOpen(false)
    }

    React.useEffect(() => {
        return () => {
            document.removeEventListener('click',onClose)
        }
    })

    return (
        <>
            <li className={styles.elem + ` mt-6`} onClick={open}>
                <Counter count={1} size="default" extraClass="m-1" />
                <img src={item.image} alt={item.name} className='pl-4 pr-4'/>
                <div className={styles.price}>
                    <h4 className='text text_type_digits-default p-1'>{item.price}</h4>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={styles.custom_text+' text text_type_main-default'}>{item.name}</p>
            </li>
            {modalOpen && 
                <Modal onClose={onClose}><IngridientDetails element={item} /></Modal>
            }
        </>
    )
}

IngridientsType.propTypes = {
    item: PropTypes.object.isRequired
}