import React from 'react';
import ReactDOM from 'react-dom'
import styles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const domPortal = document.getElementById("react-modal")



export default function Modal({children, onClose}) {




    const handleClose = (e) => {
        onClose(e)
    }

    React.useEffect(()=> {
        document.addEventListener('keydown', handleClose);
        return() => {
            document.removeEventListener('keydown', handleClose);
        }
    })



    return ReactDOM.createPortal(
        
            <ModalOverlay onClick={onClose}>
                <div className={styles.modal}>
                <button className={styles.closeButton + ` pt-15 pr-10`}>
                    <CloseIcon type="primary" />
                </button>
                {children}
                </div>
            </ModalOverlay>,
        
        domPortal
    )
}