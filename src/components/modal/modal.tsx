import React, { FC, ReactChild } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modalOverlay/modalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const domPortal = document.getElementById("react-modal") as HTMLDivElement;

interface IModal {
  children: string | ReactChild;
  onClose: () => void;
}

const Modal: FC<IModal> = ({ children, onClose }) => {
  const handleClose = (e: KeyboardEvent) => {
    if (e.type === "keydown" && e.code === "Escape") {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  });

  return ReactDOM.createPortal(
    <div className={styles.main}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton + ` pt-15 pr-10`}
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </div>,
    domPortal
  );
};

export default Modal;
