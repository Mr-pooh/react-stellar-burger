import { FC, useRef } from "react";
import styles from "../constructorBurger.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { TIngredient } from "../../../utils/types";

interface ISelecterElement {
  id: string;
  index: number;
  moveCard: (dragIndex?: number, hoverIndex?: number) => void;
  name: string;
  price: number;
  image: string;
  handleClose: () => void;
}

const SelectedElement: FC<ISelecterElement> = ({
  id,
  index,
  moveCard,
  name,
  price,
  image,
  handleClose,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: "sort",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (
        dragIndex &&
        hoverClientY &&
        dragIndex < hoverIndex &&
        hoverClientY < hoverMiddleY
      ) {
        return;
      }

      if (
        dragIndex &&
        hoverClientY &&
        dragIndex > hoverIndex &&
        hoverClientY > hoverMiddleY
      ) {
        return;
      }
      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "sort",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className={styles.itemSelect}
      key={id}
      style={{ ...styles, opacity }}
      ref={ref}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleClose}
      />
    </div>
  );
};

export default SelectedElement;
