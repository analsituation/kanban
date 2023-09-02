import React, { useRef } from 'react'
import clsx from 'clsx'
import styles from './Modal.module.sass'

const Modal = ({ children, shown, setModalShown, title }) => {
  const modalRef = useRef(null)
  const spanRef = useRef(null)
  const removeVisibility = e => {
    if (e.target === modalRef.current || e.target === spanRef.current) {
      setModalShown(false)
    }
  }

  return (
    <div
      ref={modalRef}
      className={clsx(styles.modal, shown && styles.active)}
      onClick={e => removeVisibility(e)}
    >
      <div className={styles.modal_window}>
        <div className={styles.topLine}>
          <h3 className={styles.modal_title}>{title}</h3>
          <span ref={spanRef} onClick={e => removeVisibility(e)} className={styles.close}>
            &#10005;
          </span>
        </div>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
