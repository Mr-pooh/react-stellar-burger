import { ingredientPropType } from '../../utils/prop-types';
import styles from './ingridientDetails.module.css';
import PropTypes from 'prop-types';

export default function IngridientDetails({element}) {

    return(
        <div className={styles.ingridentModalBlock}>
            <h1 className={styles.title + ` text text_type_main-large pt-10 pl-10 pr-10`}>Детали ингредиента</h1>
            <div className={styles.main + ` pb-15`}>  
                <img className={styles.image} src={element.image} alt={element.name} />
                <p className='text text_type_main-medium pt-4'>{element.name}</p>

                <ul className={styles.compound + ` pt-8`}>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{element.calories}</span>
                    </li>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{element.proteins}</span>
                    </li>                
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{element.fat}</span>
                    </li>
                    <li className={styles.compoundBlock}>
                        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                        <span className='text text_type_digits-delfaut text_color_inactive'>{element.carbohydrates}</span>
                    </li>
                </ul>
            </div>
        </div>
        
        )
};

IngridientDetails.propTypes = {
    element: ingredientPropType.isRequired
}