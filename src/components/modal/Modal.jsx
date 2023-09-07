import React, { useRef, useState } from 'react'
import clsx from 'clsx'

import styles from './Modal.module.sass'

const Modal = ({ children, shown, setModalShown, title, editable = false, deleteTask }) => {
  const [tooltipVisibility, setTooltipVisibility] = useState(false)
  const modalRef = useRef(null)
  const spanRef = useRef(null)
  const tooltipRef = useRef(null)

  const removeVisibility = e => {
    if (e.target === modalRef.current || e.target === spanRef.current) {
      setTooltipVisibility(false)
      setModalShown(false)
    }
  }

  const hideTooltip = e => {
    if (e.target !== tooltipRef.current && tooltipVisibility) {
      setTooltipVisibility(false)
    }
  }

  return (
    <div
      ref={modalRef}
      className={clsx(styles.modal, shown && styles.active)}
      onClick={e => removeVisibility(e)}
    >
      <div className={styles.modal_window} onClick={e => hideTooltip(e)}>
        <div className={styles.topLine}>
          <h3 className={styles.modal_title}>{title}</h3>
          {editable ? (
            <>
              <div onClick={() => setTooltipVisibility(true)} className={styles.edit_button}>
                <span></span>
              </div>
              <div
                ref={tooltipRef}
                className={clsx(styles.tooltip, tooltipVisibility && styles.tooltip_active)}
              >
                <button onClick={deleteTask}>Delete&nbsp;task</button>
              </div>
            </>
          ) : (
            <span ref={spanRef} onClick={e => removeVisibility(e)} className={styles.close}>
              &#10005;
            </span>
          )}
        </div>
        <div className={styles.modal_content}>{children}</div>
      </div>
    </div>
  )
}

export default Modal
