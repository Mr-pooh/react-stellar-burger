import BurgerIngridients from "../components/ingridients/ingridients";
import BurgerConstructor from "../components/constuctorBurger/constructorBurger";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FC } from "react";

const HomePage: FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <BurgerIngridients />
      <BurgerConstructor />
    </DndProvider>
  );
};

export default HomePage;
