import React from 'react';
import { orderApi } from '../../utils/order-api.js'
import styles from './constructorBurger.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import SelectedElement from './selectedElement/selectedElement';
import Modal from '../modal/modal.jsx';
import OrderDetails from '../orderDetails/orderDetails.jsx';
import { reducer, startSumm } from '../services/summReducer.jsx';
import { useDispatch, useSelector } from 'react-redux';




export default function BurgerConstructor() {


    const { cart } = useSelector(store => ({
        cart: store.initial.data
      }))

    const dispatch = useDispatch();


    
    const [stater, dispatchSumm] = React.useReducer(reducer, startSumm);
  
    // const [ orderPush, setOrderPush ] = React.useState({
    //     loading: false,
    //     hasError: false,
    //     active: false,
    //     newElem: {}
    // })

    
    //   const open = () => {
    //       setOrderPush({active: true}); 
    //   }
    
    
    // const onClose = () => {
    //     setOrderPush({active: false})
    // }
    
    // React.useEffect(() => {
    //     return () => {
    //         document.removeEventListener('click',onClose)
    //     }
    // })

    // const addSumm = React.useMemo(()=> {
    //     dispatch({
    //         type: 'add',
    //         elem:     //     })
    // }, [)

    // const pushElement = () => {
    //     if(bun !== 0 ){
    //         return  [bun._id].concat(ingridients.map(item => item._id))  
    //     }
    //     else {
    //         return Error
    //     }
    // }

    // React.useEffect(()=> {
    //     const orderInitial = () => {
    //         setOrderPush({ ...orderPush, loading: true, hasError: false })
    //         orderApi(pushElement())
    //         .then((res)=> {
    //             setOrderPush({
    //                 ...orderPush,
    //                 loading: false,
    //                 newElem: res
    //             })
    //         })
    //         .catch((err) => {
    //             setOrderPush({
    //               ...orderPush,
    //               hasError: true,
    //               loading: false
    //             })
    //             console.log(err)
    //           })
    //     }
       
    //     if(orderPush.active){
    //         orderInitial()
    //     }
        
       
    // }, [!orderPush.active])

    // const { newElem, isLoading, hasError, active } = orderPush
 
    return (
        <section className={styles.constructorBurger + ` text pt-25 ml-10`}>
            <div className={styles.constructorItems + ' pl-4'}>
                <div className={styles.list + ` text ml-8`}>
                    {cart &&
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={cart.name + ` (верх)`}
                            price={cart.price}
                            thumbnail={cart.image}
                        />
                    }
                </div>
                <div className={styles.ingridientsSelect + ` custom-scroll`}>
                    <SelectedElement data={cart} />
                </div>
                <div className={styles.list + ` text ml-8`}>
                    {cart &&
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={cart.name + ` (низ)`}
                            price={cart.price}
                            thumbnail={cart.image}
                        />
                    }
                </div>
                <div className={styles.summ + ` mt-10`}>
                    <p className='text text_type_digits-medium pr-10'>{stater.price}<CurrencyIcon type="primary" /></p>
                    <Button htmlType="button" type="primary" size="medium" onClick={()=> {
                        // if(bun){
                        //     open();
                        // }                
                        }}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {/* {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {active && !isLoading && !hasError && newElem &&
                <Modal onClose={onClose}>
                    <OrderDetails data={newElem} />
                </Modal>
            } */}
        </section>
    )
}

