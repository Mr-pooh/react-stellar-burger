import { useSelector } from 'react-redux';
import styles from './ingridientDetails.module.css';
import { getStoreModalIngredient } from '../services/modalIngredientSlice';
import { useLocation, Link } from 'react-router-dom'

export default function IngridientDetails() {

    const { details } = useSelector(getStoreModalIngredient);

    return(
        <div className={styles.ingridentModalBlock}>
            <h1 className={styles.title + ` text text_type_main-large pt-10 pl-10 pr-10`}>Детали ингредиента</h1>
            <div className={styles.main + ` pb-15`}>  
                <img className={styles.image} src={details.image} alt={details.name} />
                <p className='text text_type_main-medium pt-4'>{details.name}</p>
                <ul className={styles.compound + ` pt-8`}>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{details.calories}</span>
                    </li>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{details.proteins}</span>
                    </li>                
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{details.fat}</span>
                    </li>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{details.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>
        )
};
