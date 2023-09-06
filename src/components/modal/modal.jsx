import React from 'react';
import ReactDOM from 'react-dom'
import styles from './modal.module.css';
import ModalOverlay from '../modalOverlay/modalOverlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes  from 'prop-types';


const domPortal = document.getElementById("react-modal")



export default function Modal({children, onClose}) {




    const handleClose = (e) => {
        if(e.type === 'keydown' && e.code === 'Escape') {
            onClose()  
        }
    }

    React.useEffect(()=> {
        document.addEventListener('keydown', handleClose);
        return() => {
            document.removeEventListener('keydown', handleClose);
        }
    })



    return ReactDOM.createPortal(
        
            <ModalOverlay onClose={onClose}>
                <div className={styles.modal} onClick={(event)=> event.stopPropagation()}>
                <button className={styles.closeButton + ` pt-15 pr-10`} onClick={onClose}>
                    <CloseIcon type="primary" />
                </button>
                {children}
                </div>
            </ModalOverlay>,
        
        domPortal
    )
}

Modal.propTypes = {
    children: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired
}