import styles from './orderDetails.module.css';
import image from '../../images/logoReady.svg'
import { useSelector } from 'react-redux';

export default function OrderDetails() {

    const { data } = useSelector(store => ({
        data: store.orderDetails.data
    }))

        return(
            <div className={styles.main + ` pt-30 pb-30`}>
                <h2 className='text text_type_digits-large pb-8'>{data.order.number}</h2>
                <p className='text text_type_main-medium pb-15'>идентификатор заказа</p>
                <img src={image}/>
                <p className='text text_type_main-default pt-15 pb-2'>Ваш заказ начали готовить</p>
                <span className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</span>
            </div>
        )
}

