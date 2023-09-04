import styles from './modalOverlay.module.css'

export default function ModalOverlay({children, onClose}) {
    return(
        <div className={styles.overlay} onClick={onClose} >{children}</div>
    )
}