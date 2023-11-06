import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {ingredientPropType} from '../../../utils/prop-types.js';
import styles from '../constructorBurger.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

export default function SelectedElement({id, index, moveCard, name, price, image, handleClose}) {

    const ref = useRef(null)

    const [{ handlerId }, drop] = useDrop({
    accept: 'sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      
      const clientOffset = monitor.getClientOffset() 
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'sort',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))


    return (
        <div className={styles.itemSelect} key={id} style={{ ...styles, opacity }} ref={ref} data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement text={name} price={price} thumbnail={image} handleClose={handleClose}/>
        </div>
    )
}

// SelectedElement.propTypes = {
//     item: ingredientPropType.isRequired
// }