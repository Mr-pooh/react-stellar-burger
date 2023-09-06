import styles from './modalOverlay.module.css';
import PropTypes from 'prop-types'

export default function ModalOverlay({children, onClose}) {
    return(
        <div className={styles.overlay} onClick={onClose} >{children}</div>
    )
}

ModalOverlay.propTypes = {
    children: PropTypes.object.isRequired,
    onclose: PropTypes.func.isRequired
}