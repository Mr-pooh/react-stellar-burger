import BurgerIngridients from "../components/ingridients/ingridients";
import BurgerConstructor from '../components/constuctorBurger/constructorBurger';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function HomePage(){

    return (
        <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor /> 
        </DndProvider>
    )
}

export default HomePage