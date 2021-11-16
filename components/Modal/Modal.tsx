import { ModalProps } from "./Modal.model";

export default Modal;
import styles from "styles/components/Modal.module.scss";

export { Modal };

function Modal({ show, close, title, children }: ModalProps): JSX.Element {
  return (
    <div
      className={`${styles.modalContainer} ${show ? styles.show : ""} `}
      onClick={() => close()}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.modalHeader}>
          <h2 className={styles.modalHeaderTitle}>{title}</h2>
          <button className={styles.close} onClick={() => close()}>
            <img src="assets/close.svg" alt="close" />
          </button>
        </header>
        <main className={styles.modalContent}>{show && children}</main>
      </div>
    </div>
  );
}
