import { FC } from "react";
import styles from "./modalOverlay.module.css";

const ModalOverlay: FC<{ onClose: () => void }> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

export default ModalOverlay;
